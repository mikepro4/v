import { assign } from "lodash";
import update from "immutability-helper";

import {
	SHOW_LEFT_SIDEBAR,
	HIDE_LEFT_SIDEBAR,
	SHOW_RIGHT_SIDEBAR,
	HIDE_RIGHT_SIDEBAR,
	SHOW_GLOBAL_CODE,
	HIDE_GLOBAL_CODE,
	SHOW_PATHS,
	SHOW_GRAPH
} from "../actions/types";

export const initialState = {
	leftSidebarVisible: false,
	rightSidebarVisible: false,
	globalCodeVisible: false,
	pathsVisible: true,
	graphVisible: false
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LEFT_SIDEBAR:
			return {
				...state,
				leftSidebarVisible: true
			}
		case HIDE_LEFT_SIDEBAR:
			return {
				...state,
				leftSidebarVisible: false
			}
		case SHOW_RIGHT_SIDEBAR:
			return {
				...state,
				rightSidebarVisible: true
			}
		case HIDE_RIGHT_SIDEBAR:
			return {
				...state,
				rightSidebarVisible: false
			}
		case SHOW_GLOBAL_CODE:
			return {
				...state,
				globalCodeVisible: true
			}
		case HIDE_GLOBAL_CODE:
			return {
				...state,
				globalCodeVisible: false
			}
		case SHOW_PATHS:
			return {
				...state,
				pathsVisible: true,
				graphVisible: false
			}
		case SHOW_GRAPH:
			return {
				...state,
				pathsVisible: false,
				graphVisible: true
			}
		default:
			return state;
	}
};
