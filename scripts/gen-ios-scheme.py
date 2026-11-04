#!/usr/bin/env python3
"""
Generate an Xcode shared scheme for the Capacitor iOS project.

Capacitor 8 ships an .xcodeproj without a shared scheme, so `xcodebuild -scheme App`
fails in CI ("Scheme App not found"). xcodebuild also cannot resolve the local
Swift Package (CapApp-SPM) when building with `-target` instead of `-scheme`,
because package products are not linked in that mode.

So we parse the native target's blueprint identifier out of project.pbxproj and
write a proper shared scheme into:
    ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
"""
import os
import re
import sys

PBXPROJ = os.path.join("ios", "App", "App.xcodeproj", "project.pbxproj")
SCHEMES_DIR = os.path.join(
    "ios", "App", "App.xcodeproj", "xcshareddata", "xcschemes"
)
SCHEME_PATH = os.path.join(SCHEMES_DIR, "App.xcscheme")
TARGET_NAME = "App"
PRODUCT_NAME = "App.app"


def find_target_ids(pbxproj_text):
    """Return [(target_name, blueprint_id), ...] for PBXNativeTarget entries."""
    results = []
    # Each native target block looks like:
    #   ID /* App */ = { isa = PBXNativeTarget; ... name = App; ... };
    for block in re.finditer(
        r"([0-9A-F]{24})\s*/\*\s*(.*?)\s*\*/\s*=\s*\{\s*isa = PBXNativeTarget;(.*?)\n\t\t\};",
        pbxproj_text,
        re.DOTALL,
    ):
        blueprint_id, _comment, body = block.group(1), block.group(2), block.group(3)
        name_match = re.search(r"\bname = ([^;]+);", body)
        if not name_match:
            continue
        name = name_match.group(1).strip().strip('"')
        results.append((name, blueprint_id))
    return results


def main():
    if not os.path.isfile(PBXPROJ):
        sys.exit(f"ERROR: {PBXPROJ} not found (did `npx cap add ios` run?)")

    with open(PBXPROJ, "r", encoding="utf-8") as fh:
        pbxproj_text = fh.read()

    targets = find_target_ids(pbxproj_text)
    blueprint_id = None
    for name, tid in targets:
        if name == TARGET_NAME:
            blueprint_id = tid
            break

    if not blueprint_id:
        found = ", ".join(n for n, _ in targets) or "none"
        sys.exit(f"ERROR: native target '{TARGET_NAME}' not found (found: {found})")

    scheme = f"""<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1600"
   version = "1.7">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "{blueprint_id}"
               BuildableName = "{PRODUCT_NAME}"
               BlueprintName = "{TARGET_NAME}"
               ReferencedContainer = "container:App.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES">
      <Testables>
      </Testables>
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "{blueprint_id}"
            BuildableName = "{PRODUCT_NAME}"
            BlueprintName = "{TARGET_NAME}"
            ReferencedContainer = "container:App.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Release"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "{blueprint_id}"
            BuildableName = "{PRODUCT_NAME}"
            BlueprintName = "{TARGET_NAME}"
            ReferencedContainer = "container:App.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>
"""

    os.makedirs(SCHEMES_DIR, exist_ok=True)
    with open(SCHEME_PATH, "w", encoding="utf-8") as fh:
        fh.write(scheme)

    print(f"Generated {SCHEME_PATH} for target '{TARGET_NAME}' ({blueprint_id})")


if __name__ == "__main__":
    main()
