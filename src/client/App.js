import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import ReactDOM from "react-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';
import keydown from "react-keydown";
import classNames from "classnames"
import { Link } from "react-router-dom";

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {

	render() {
		return (
			<div className="app-container">

				<div className="app-header">
					<div className="dark-header">
					</div>

					<div className="light-header">
					</div>
				</div>

				<div className="app-content">

					<div className="left-sidebar">
					 	<div className="sidbear-header">
							<div className="sidebar-header-left">
								Workbook content
							</div>

							<div className="sidebar-header-right">
								x
							</div>
						</div>
					</div>

					<div className="main-area">

						<div className="main-navigation-toolbar">
							<div className="nav-header-left">
								Workbook content | Global Code
							</div>

							<div className="nav-header-center">
								Paths |  Graph
							</div>

							<div className="nav-header-right">
								Console
							</div>
						</div>

						<div className="main-area-sections-container">

							<div className="main-area-section-global-code">
								global code
							</div>

							<div className="main-area-section-general">
								general area
							</div>
						</div>

					</div>

					<div className="right-sidebar">
						<div className="sidbear-header">
							<div className="sidebar-header-left">
								Console
							</div>

							<div className="sidebar-header-right">
								x
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, { })(withRouter(App))
};
