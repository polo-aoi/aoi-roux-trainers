
import { FavCase } from "./Types"
import Selector from './lib/Selector';
import { cmll_algs_raw } from './lib/Algs';
import { SliderOpt } from "./Types";
import { X } from './Translation';

export const initialFavList : FavCase[] = []

export type Config = {
    showCube: Selector;
    theme: Selector;
    evaluator: Selector;
    moveCountHint: Selector;
    fbdrLevelSelector: SliderOpt;
    fbssLevelSelector: SliderOpt;
    fbLevelSelector: SliderOpt;
    fsLevelSelector: SliderOpt;
    ssLevelSelector: SliderOpt;
    cmllSelector: Selector;
    cmllCaseSelector: Selector;
    cmllAufSelector: Selector;
    cmllCubeMaskSelector: Selector;
    cmll2D3DSelector: Selector;
    cmll3DFaceSelector: Selector;
    cmllflat3DFaceSelector: Selector;
    cmllKataSelector: Selector;
    cmllBatchModeSelector: Selector;
    nmcllSelector: Selector;
    triggerSelector: Selector;
    hyperOriSelector: Selector;
    ollcpCaseSelector: Selector;
    orientationSelector: Selector;
    fbdrSelector: Selector;
    fsSelector: Selector;
    fbdrPosSelector1: Selector;
    fbdrPosSelector2: Selector;
    fbdrPosSelector3: Selector;
    fbssLpSelector: Selector;
    fbssSsSelector: Selector;
    ssSelector: Selector;
    ssEOSelector: Selector;
    ssPosSelector: Selector;
    fbOnlySelector: Selector;
    fbBasisSelector: Selector;
    fbdrScrambleSelector: Selector;
    ssPairOnlySelector: Selector;
    fbPairSolvedSelector: Selector;
    solutionNumSelector: Selector;
    fbPieceSolvedSelector: Selector;
    lseMCSelector: Selector;
    lseBarSelector: Selector;
    lseStageSelector: Selector;
    lseEOSelector: Selector;
    lseEOLRMCSelector: Selector;
    lseBarbieSelector: Selector;
    lseEOLRScrambleSelector: Selector;
    obscureNonLRSelector: Selector;
    obscureStickerWidthSelector: Selector;
    obscureCornerMaskSelector: Selector;
    chainTargetSelector: Selector;
};

const cmll_alg_names = cmll_algs_raw.map(x => x[0])
const ollcp_alg_names = cmll_algs_raw.map(x => x[0])

export const EOLRMode = {
    NONMC_SHORTER_ONLY: "Only show cases where non-MC is optimal",
    MC_SHORTER_ONLY: "Only show cases where MC is optimal",
    COMBINED: "Combined",
    MC_ONLY: "Only show MC solutions",
    NONMC_ONLY: "Only show non-MC solutions"
}

const initialLevels = {
    fbdrLevelSelector: ({
        l: 1, r: 7, label: X.CONFIG.FBDR_LEVEL, value: 0, extend_r: true
    }),
    fbssLevelSelector: ({
        l: 3, r: 9, label: X.CONFIG.FBSS_LEVEL, value: 2
    }),
    fsLevelSelector: ({
        l: 1, r: 6, label: X.CONFIG.FS_LEVEL, value: 0
    }),
    fbLevelSelector: ({
        l: 3, r: 8, label: X.CONFIG.FB_LEVEL, value: 2, extend_r: true
    }),
    ssLevelSelector: ({
        l: 1, r: 10, label: X.CONFIG.SS_LEVEL, value: 0
    }),
}

export function createInitialConfig(): Config {
    const colorSchemeDisplayNames = [
        X.COLOR_SCHEMES.WG, X.COLOR_SCHEMES.WB, X.COLOR_SCHEMES.WO, X.COLOR_SCHEMES.WR,
        X.COLOR_SCHEMES.YG, X.COLOR_SCHEMES.YB, X.COLOR_SCHEMES.YO, X.COLOR_SCHEMES.YR,
        X.COLOR_SCHEMES.BW, X.COLOR_SCHEMES.BY, X.COLOR_SCHEMES.BO, X.COLOR_SCHEMES.BR,
        X.COLOR_SCHEMES.GW, X.COLOR_SCHEMES.GY, X.COLOR_SCHEMES.GO, X.COLOR_SCHEMES.GR,
        X.COLOR_SCHEMES.OW, X.COLOR_SCHEMES.OY, X.COLOR_SCHEMES.OB, X.COLOR_SCHEMES.OG,
        X.COLOR_SCHEMES.RW, X.COLOR_SCHEMES.RY, X.COLOR_SCHEMES.RB, X.COLOR_SCHEMES.RG,
    ]
    const EOLRModeDisplay = {
        NONMC_SHORTER_ONLY: X.EOLR_MODE.NONMC_SHORTER_ONLY,
        MC_SHORTER_ONLY: X.EOLR_MODE.MC_SHORTER_ONLY,
        COMBINED: X.EOLR_MODE.COMBINED,
        MC_ONLY: X.EOLR_MODE.MC_ONLY,
        NONMC_ONLY: X.EOLR_MODE.NONMC_ONLY
    }
    const fbPieceSolvedAnnotation = X.DIFFICULTY_ANNOTATION
    let arr_ori_flag = Array(24).fill(0)
    arr_ori_flag[0] = 1 // WG (fixed)
    return {
        showCube: new Selector({
            label: X.CONFIG.VIRTUAL_CUBE,
            names:["Show", "Hide"],
            displayNames: [X.COMMON.SHOW, X.COMMON.HIDE],
            flags: [1,0],
            kind: "virtual-cube"
        }),
        theme: new Selector({
            names: ["bright", "dark"],
            displayNames: [X.CONFIG.THEME_BRIGHT, X.CONFIG.THEME_DARK],
            flags: [1, 0],
            kind: "theme"
        }),
        evaluator: new Selector({
            label: X.CONFIG.SOLUTION_SORTING,
            names: ["Default", "QTM"],
            displayNames: [X.CONFIG.SORT_DEFAULT, X.CONFIG.SORT_QTM],
            flags: [1, 0],
            kind: "evaluator"
        }),
        moveCountHint: new Selector({
            label: X.CONFIG.MOVE_COUNT_HINT,
            names: ["Show", "Hide"],
            displayNames: [X.COMMON.SHOW, X.COMMON.HIDE],
            flags: [1, 0],
            kind: "movecount_hint"
        }),
        cmllSelector: new Selector({
            names: ["o", "s", "as", "t", "l", "u", "pi", "h"],
            flags: [1, 1, 1, 1, 1, 1, 1, 1],
            kind: "cmll",
        }),
        nmcllSelector: new Selector({
            names: ["o_1", "o_2", "s_1", "s_2", "s_3", "as_1", "as_2", "as_3", "t_1", "t_2", "t_3",
                    "u_1", "u_2", "u_3", "l_1", "l_2", "l_3", "pi_1", "pi_2", "pi_3", "h_1", "h_2", "h_3"],
            flags: Array(23).fill(1),
            kind: "nmcll",
        }),
        cmllCaseSelector: new Selector({
            names: cmll_alg_names,
            flags: Array(cmll_alg_names.length).fill(1),
            kind: "cmll_case"
        }),
        cmllAufSelector: new Selector({
            names: ["None", "U", "U'", "U2"],
            displayNames: [X.CONFIG.CMLL_AUF_NONE, "U", "U'", "U2"],
            flags: [1, 1, 1, 1],
            kind: "u_auf"
        }),
        cmllCubeMaskSelector: new Selector({
            names: ["Show", "Hide", "Hide LSE"],
            displayNames: [X.CONFIG.CUBE_MASK_SHOW, X.CONFIG.CUBE_MASK_HIDE, X.CONFIG.CUBE_MASK_HIDE_LSE],
            flags: [1, 0, 0],
            kind: "cube_mask"
        }),
        cmll2D3DSelector: new Selector({
            names: ["flat3D", "3D", "2D"],
            displayNames: [X.CONFIG.VIS_FLAT3D, X.CONFIG.VIS_3D, X.CONFIG.VIS_2D],
            flags: [1, 0, 0],
            kind: "cmll_vis_type"
        }),
        cmll3DFaceSelector: new Selector({
            names: ["Show", "Hide"],
            displayNames: [X.COMMON.SHOW, X.COMMON.HIDE],
            flags: [0, 1],
            kind: "cmll_3d_faces"
        }),
        cmllflat3DFaceSelector: new Selector({
            names: ["L", "R"],
            flags: [0, 1],
            kind: "cmll_flat3d_faces"
        }),
        cmllKataSelector: new Selector({
            names: ["off", "on"],
            displayNames: [X.COMMON.OFF, X.COMMON.ON],
            flags: [1, 0],
            kind: "cmll_kata_type"
        }),
        cmllBatchModeSelector: new Selector({
            names: ["off", "on"],
            displayNames: [X.COMMON.OFF, X.COMMON.ON],
            flags: [1, 0],
            kind: "cmll_batch_mode"
        }),
        triggerSelector: new Selector({
            names: ["RUR'", "RU'R'", "R'U'R", "R'UR", "RU2R'", "R'U2R"],
            flags: [0, 0, 0, 0, 0, 0],
            kind: "trigger"
        }),
        hyperOriSelector: new Selector({
            names: ["off", "L/R", "F/B"],
            displayNames: [X.CONFIG.NMCLL_OFF, "L/R", "F/B"],
            flags: [1 ,0, 0],
            kind: "hyperori"
        }),
        ollcpCaseSelector: new Selector({
            names: ollcp_alg_names,
            flags: Array(ollcp_alg_names.length).fill(1),
            kind: "ollcp_case"
        }),
        orientationSelector: new Selector({
            label: X.CONFIG.COLOR_SCHEME_LABEL,
            names: [
                "WG", "WB", "WO", "WR",
                "YG", "YB", "YO", "YR",
                "BW", "BY", "BO", "BR",
                "GW", "GY", "GO", "GR",
                "OW", "OY", "OB", "OG",
                "RW", "RY", "RB", "RG",
            ],
            displayNames: colorSchemeDisplayNames,
            flags: arr_ori_flag,
            kind: "orientation"
        }),
        fbBasisSelector: new Selector({
            label: X.CONFIG.FB_BASIS,
            names: ["Default", "DL", "BL"],
            displayNames: [X.CONFIG.FB_BASIS_DEFAULT, "DL", "BL"],
            flags: [1, 0, 0],
            kind: "fb-basis"
        }),
        fbdrSelector: new Selector({
            label: X.CONFIG.POSITION_OF_SQUARE,
            names: ["FS at back", "FS at front", "Either"],
            displayNames: [X.CONFIG.FS_AT_BACK, X.CONFIG.FS_AT_FRONT, X.CONFIG.EITHER],
            flags: [1, 0, 0],
            kind: "fbdr"
        }),
        fbdrScrambleSelector: new Selector({
            label: X.CONFIG.SCRAMBLE_TYPE,
            names: ["Short (Concerning FBDR Pieces only)", "Random State (Entire cube, useful for practicing F2B)"],
            displayNames: [X.CONFIG.SCRAMBLE_SHORT, X.CONFIG.SCRAMBLE_RANDOM_STATE],
            flags: [1, 0],
            kind: "fbdr-scramble"
        }),
        fbOnlySelector: new Selector({
            label: X.CONFIG.PIECES_TO_SOLVE,
            names: ["FB Last Pair + DR", "FB Last Pair Only"],
            displayNames: [X.CONFIG.FB_LAST_PAIR_DR, X.CONFIG.FB_LAST_PAIR_ONLY],
            flags: [0, 1],
            kind: "fb-only"
        }),
        fbPairSolvedSelector: new Selector({
            label: X.CONFIG.LAST_PAIR_PATTERN,
            names: ["Random", "Solved"],
            displayNames: [X.CONFIG.RANDOM, X.CONFIG.SOLVED],
            flags: [1, 0],
            kind: "fb-pair-solved"
        }),
        fbdrPosSelector1: new Selector({
            label: X.CONFIG.POSITION_OF_FB_EDGE,
            names: ["UF", "FU", "UL", "LU", "UB", "BU", "UR", "RU", "DF", "FD", "DB", "BD",
                    "DR", "RD", "BR", "RB", "FR", "RF"],
            flags: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            kind: "fbdr-position-1"
        }),
        fbdrPosSelector2: new Selector({
            label: X.CONFIG.POSITION_OF_FB_EDGE,
            names: ["UF", "FU", "UL", "LU", "UB", "BU", "UR", "RU", "DF", "FD", "DB", "BD",
                    "DR", "RD", "BR", "RB", "FR", "RF"],
            flags: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            kind: "fbdr-position-2"
        }),
        fbdrPosSelector3: new Selector({
            label: X.CONFIG.POSITION_OF_DR,
            names: ["UF", "FU", "UL", "LU", "UB", "BU", "UR", "RU", "DF", "FD", "DB", "BD",
                    "DR", "RD", "BR", "RB", "FR", "RF"],
            flags: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            kind: "fbdr-position-3"
        }),

        fsSelector: new Selector({
            label: X.CONFIG.POSITION_OF_SQUARE,
            names: ["Front FS", "Back FS", "Both"],
            displayNames: [X.CONFIG.FRONT_FS, X.CONFIG.BACK_FS, X.CONFIG.BOTH],
            flags: [0, 0, 1],
            kind: "fs"
        }),
        ssSelector: new Selector({
            label: X.CONFIG.SS_POSITION,
            names: ["Front SS", "Back SS", "Both"],
            displayNames: [X.CONFIG.FRONT_SS, X.CONFIG.BACK_SS, X.CONFIG.BOTH],
            flags: [1, 0, 0],
            kind: "ss"
        }),
        ssEOSelector: new Selector({
            label: X.CONFIG.ORIENTATION_OF_DR,
            names: ["Oriented", "Misoriented", "Either"],
            displayNames: [X.CONFIG.ORIENTED, X.CONFIG.MISORIENTED, X.CONFIG.EITHER],
            flags: [1, 0, 0],
            kind: "ss-orientation"
        }),
        ssPosSelector: new Selector({
            label: X.CONFIG.POSITION_OF_DR,
            names: ["UF", "FU", "UL", "LU", "UB", "BU", "UR", "RU", "DF", "FD", "DB", "BD",
                    "DR", "RD", "BR", "RB", "FR", "RF"],
            flags: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            kind: "ss-position"
        }),
        ssPairOnlySelector: new Selector({
            label: X.CONFIG.PIECES_TO_SOLVE,
            names: ["SS", "DR fixed"],
            displayNames: [X.CONFIG.SS_LABEL, X.CONFIG.DR_FIXED],
            flags: [1, 0],
            kind: "sb-pair-only"
        }),
        solutionNumSelector: new Selector({
            label: X.CONFIG.NUM_SOLUTIONS,
            names: ["1", "3", "5", "10", "25", "100"],
            flags: [0, 0, 1, 0, 0, 0],
            kind: "solution-num"
        }),
        fbPieceSolvedSelector: new Selector({
            label: X.CONFIG.DIFFICULTY,
            names: ["Random", "DL Solved", "BL Solved", "Hard"],
            displayNames: [X.CONFIG.DIFF_RANDOM, X.CONFIG.DIFF_DL_SOLVED, X.CONFIG.DIFF_BL_SOLVED, X.CONFIG.DIFF_HARD],
            annotation: fbPieceSolvedAnnotation,
            flags: [1, 0, 0, 0],
            kind: "fb-piece-solved"
        }),
        fbssLpSelector: new Selector({
            label: X.CONFIG.SS_POSITION,
            names: ["Front FBLP", "Back FBLP"],
            displayNames: [X.CONFIG.FRONT_FBLP, X.CONFIG.BACK_FBLP],
            flags: [1, 0],
            kind: "fbss-lp"
        }),
        fbssSsSelector: new Selector({
            label: X.CONFIG.SS_POSITION,
            names: ["Front SS", "Back SS" , "Both"],
            displayNames: [X.CONFIG.FRONT_SS, X.CONFIG.BACK_SS, X.CONFIG.BOTH],
            flags: [1, 0, 0],
            kind: "fbss-ss"
        }),
        lseMCSelector: new Selector({
            label: X.CONFIG.LSE_CENTER,
            names: ["Aligned", "Misaligned"],
            displayNames: [X.CONFIG.ALIGNED, X.CONFIG.MISALIGNED],
            flags: [0, 1],
            kind: "lse-mc"
        }),
        lseBarSelector: new Selector({
            label: X.CONFIG.EO_PAIR,
            names: ["ULUR", "UFUB"],
            flags: [1, 0],
            kind: "lse-bar"
        }),
        lseStageSelector: new Selector({
            label: X.CONFIG.STAGE,
            names: ["4b for MC(1 move EOPair insert)", "M2 to 4c", "4c"],
            displayNames: [X.CONFIG.STAGE_4B_MC, X.CONFIG.STAGE_M2_4C, X.CONFIG.STAGE_4C],
            flags: [0, 1, 0],
            kind: "lse-stage"
        }),
        lseEOSelector: new Selector({
            label: X.CONFIG.EO,
            names: ["solved", "arrow", "4/0", "2o/0", "2a/0", "1/1", "6flip", "2o/2", "0/2", "2a/2"],
            displayNames: [X.CONFIG.EO_SOLVED, X.CONFIG.EO_ARROW, "4/0", "2o/0", "2a/0", "1/1", "6flip", "2o/2", "0/2", "2a/2"],
            flags: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            kind: "lse-eo"
        }),
        lseEOLRMCSelector: new Selector({
            label: X.CONFIG.CENTER_STRATEGY,
            names: [EOLRMode.NONMC_ONLY, EOLRMode.MC_ONLY, EOLRMode.COMBINED, EOLRMode.NONMC_SHORTER_ONLY, EOLRMode.MC_SHORTER_ONLY ],
            displayNames: [EOLRModeDisplay.NONMC_ONLY, EOLRModeDisplay.MC_ONLY, EOLRModeDisplay.COMBINED, EOLRModeDisplay.NONMC_SHORTER_ONLY, EOLRModeDisplay.MC_SHORTER_ONLY],
            flags: [0, 0, 1, 0, 0],
            kind: "lse-eolrmc"
        }),
        lseBarbieSelector: new Selector({
            label: X.CONFIG.EOLR_EOLRB,
            names: ["EOLR", "EOLRb", "EOdM"],
            flags: [1, 0, 0],
            kind: "lse-barbie"
        }),
        lseEOLRScrambleSelector: new Selector({
            label: X.CONFIG.SCRAMBLE_TYPE,
            names: ["Short", "Random State"],
            displayNames: [X.CONFIG.SCRAMBLE_SHORT_LSE, X.CONFIG.SCRAMBLE_RANDOM_STATE_LSE],
            flags: [0, 1],
            kind: "lse-eolr-scramble"
        }),
        obscureNonLRSelector: new Selector({
            label: X.CONFIG.OBSCURE_NON_LR,
            names: ["Off", "On"],
            displayNames: [X.COMMON.OFF, X.COMMON.ON],
            flags: [1, 0],
            kind: "obscure-non-lr"
        }),
        obscureStickerWidthSelector: new Selector({
            label: X.CONFIG.OBSCURED_STICKER_WIDTH,
            names: ["Thin", "Medium", "Thick"],
            displayNames: [X.CONFIG.WIDTH_THIN, X.CONFIG.WIDTH_MEDIUM, X.CONFIG.WIDTH_THICK],
            flags: [0, 1, 0],
            kind: "obscure-sticker-width"
        }),
        obscureCornerMaskSelector: new Selector({
            label: X.CONFIG.FULL_CORNER_MASKING,
            names: ["Off", "On"],
            displayNames: [X.COMMON.OFF, X.COMMON.ON],
            flags: [1, 0],
            kind: "obscure-corner-mask"
        }),
        chainTargetSelector: new Selector({
            label: X.CONFIG.CHAIN_TARGET_LABEL,
            names: ["FBLP + DR", "FBLP + SS"],
            displayNames: [X.CONFIG.CHAIN_TARGET_FBLP_DR, X.CONFIG.CHAIN_TARGET_FBLP_SS],
            flags: [1, 0],
            kind: "chain-target"
        }),
        ...initialLevels,
    }
}

export const initialConfig: Config = createInitialConfig()
