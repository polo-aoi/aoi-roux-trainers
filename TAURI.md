# Tauri 构建（五平台）

本仓库同时存在两套互相独立的打包流水线，互不影响：

| 工作流 | 技术栈 | 产物 |
|---|---|---|
| `.github/workflows/build.yml`（原有） | Electron + Capacitor | Windows / Linux / macOS / Android / iOS |
| `.github/workflows/build-tauri.yml`（新增） | Tauri v2 | Windows / Linux / macOS / Android / iOS |

新增部分只追加文件，**没有改动** `build.yml`、`package.json`、`electron/` 中的任何内容。

## 触发方式

- 推送 `v*` tag：五平台全部构建，并把 `AoiRouxTrainers-tauri-*` 产物挂到该 Release。
- 手动触发（Actions → **Tauri Build** → Run workflow）：
  - `platform`：`all` / `win` / `linux` / `mac` / `android` / `ios`
  - `publish`：勾选后把产物上传到对应 Release（仅 tag 构建有效）

## 产物命名

- `AoiRouxTrainers-tauri-<版本>-windows-x64-portable.zip` / `...-windows-x64.exe` / NSIS 安装包
- `AoiRouxTrainers-tauri-<版本>-linux-x64.AppImage` / `...-linux-x64.deb` / `...-linux-x64-portable.tar.gz`
- `AoiRouxTrainers-tauri-<版本>-macos-arm64.dmg` / `...-macos-arm64.app.zip`
- `AoiRouxTrainers-tauri-<版本>-android-arm64.apk`
- `AoiRouxTrainers-tauri-<版本>-ios-unsigned.ipa`

## 本地开发

```bash
npm install
npm install -g @tauri-apps/cli@^2   # 与 CI 一致，用全局 CLI

# 首次需要生成图标（CI 里由流水线自动完成）
npm run tauri -- icon public/favicon/web-app-manifest-512x512.png

npm run build                       # 先出 CRA 产物到 build/
npm run tauri dev                   # 需要另开 npm start（devUrl 指向 3000 端口）
```

> `package.json` 里没有 `tauri` script，是为了完全不改动 Electron 流水线的依赖与脚本。
> CI 会在检出后临时执行 `npm pkg set scripts.tauri=tauri`（只作用于 runner 内的副本），
> 因为 iOS 的 Xcode 构建阶段要用 `npm run tauri ios xcode-script ...` 调用 CLI。

## 关键配置说明

- `src-tauri/Cargo.toml` 的 `[lib] crate-type = ["staticlib", "cdylib", "rlib"]` 是移动端必需项，缺了会在 Android 报 `Library artifact not found`。
- `src-tauri/tauri.conf.json`
  - `frontendDist: ../build`：直接复用 CRA 的 `build/` 目录（`homepage: "."` 已保证资源为相对路径）。
  - `beforeBuildCommand` / `beforeDevCommand` 置空：CRA 构建必须在 `CI=false` 下运行（否则警告即报错），由工作流单独执行。
  - `identifier: com.aoirouxtrainers.app` 与原有 Capacitor 配置一致；Tauri 的 identifier 不能含 `-`，所以没有沿用 electron 的 `com.aoi.roux-trainers`。
- `src-tauri/icons/`、`src-tauri/gen/`、`src-tauri/target/` 均在 `.gitignore` 中，由 CI 生成。

## Android 签名

`src-tauri/mobile/android/aoi-roux-trainers.keystore.b64` 是仓库内置的固定签名库（PKCS12，alias `aoiroux`，口令 `aoiroux2024`），
保证每次构建签名一致、可以直接覆盖升级。想换成自己的发布证书时，在仓库 Secrets 里配置：

| Secret | 说明 |
|---|---|
| `TAURI_ANDROID_KEYSTORE_B64` | keystore 的 base64 文本 |
| `TAURI_ANDROID_KEYSTORE_PASSWORD` | store 口令 |
| `TAURI_ANDROID_KEY_ALIAS` | key alias |
| `TAURI_ANDROID_KEY_PASSWORD` | key 口令（可省略，默认同 store 口令） |

配置后 CI 优先使用 Secrets，不再使用仓库内置签名库。

## iOS

无签名构建（`tauri ios build --target aarch64 --no-sign`），产出未签名 `.ipa`，需要用自己的开发者证书重签后才能装到真机。
