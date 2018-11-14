import * as _ from "lodash";

import {
	SHOW_LEFT_SIDEBAR,
	HIDE_LEFT_SIDEBAR,
	SHOW_RIGHT_SIDEBAR,
	HIDE_RIGHT_SIDEBAR,
	SHOW_GLOBAL_CODE,
	HIDE_GLOBAL_CODE,
	SHOW_PATHS,
	SHOW_GRAPH
} from "./types";

export const showLeftSidebar = () => dispatch => {
	dispatch({
		type: SHOW_LEFT_SIDEBAR,
	});
};

export const hideLeftSidebar = () => dispatch => {
	dispatch({
		type: HIDE_LEFT_SIDEBAR,
	});
};

export const showRightSidebar = () => dispatch => {
	dispatch({
		type: SHOW_RIGHT_SIDEBAR,
	});
};

export const hideRightSidebar = () => dispatch => {
	dispatch({
		type: HIDE_RIGHT_SIDEBAR,
	});
};

export const showGlobalCode = () => dispatch => {
	dispatch({
		type: SHOW_GLOBAL_CODE,
	});
};

export const hideGlobalCode = () => dispatch => {
	dispatch({
		type: HIDE_GLOBAL_CODE,
	});
};

export const showPaths = () => dispatch => {
	dispatch({
		type: SHOW_PATHS,
	});
};

export const showGraph = () => dispatch => {
	dispatch({
		type: SHOW_GRAPH,
	});
};
