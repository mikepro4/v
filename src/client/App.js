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
import { Button, Intent } from "@blueprintjs/core";

import {
	showLeftSidebar,
	hideLeftSidebar,
	showRightSidebar,
	hideRightSidebar,
	showGlobalCode,
	hideGlobalCode,
	showPaths,
	showGraph
} from "./redux/actions/appActions";

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

					<div
						className={
							classNames({
								visible: this.props.leftSidebarVisible
							}, "left-sidebar")
						}
					>
					 	<div className="sidebar-header">
							<div className="sidebar-header-left">
								Workbook content
							</div>

							<div className="sidebar-header-right">
								<Button
									minimal={true}
									icon="cross"
									onClick={() => { this.props.hideLeftSidebar()}}
								/>
							</div>
						</div>
					</div>

					<div className="main-area">

						<div className="main-navigation-toolbar">
							<div className="nav-header-left">

								{!this.props.leftSidebarVisible ? (
									<Button
										minimal={true}
										text="Workbook contents"
										onClick={() => { this.props.showLeftSidebar()}}
									/>
								) : ''}

								<Button
									minimal={true}
									text="Global code"
									className={
										classNames({
											"button-active": this.props.globalCodeVisible
										})
									}
									onClick={() => { this.props.globalCodeVisible ? this.props.hideGlobalCode() : this.props.showGlobalCode()}}
								/>

							</div>

							<div className="nav-header-center">
								<Button
									minimal={true}
									text="Paths"
									className={
										classNames({
											"button-active": this.props.pathsVisible
										})
									}
									onClick={() => { this.props.showPaths()}}
								/>

								<Button
									minimal={true}
									text="Graph"
									className={
										classNames({
											"button-active": this.props.graphVisible
										})
									}
									onClick={() => { this.props.showGraph()}}
								/>
							</div>

							<div className="nav-header-right">
								{!this.props.rightSidebarVisible ? (
									<Button
										minimal={true}
										text="Console"
										onClick={() => { this.props.showRightSidebar()}}
									/>
								) : ''}
							</div>
						</div>

						<div className="main-area-sections-container">

							<div className={
									classNames({
										visible: this.props.globalCodeVisible
									}, "main-area-section-global-code")
								}
							>
								global code
							</div>

							<div className="main-area-section-general">
								{this.props.pathsVisible ? (
									<div>Paths</div>
								) : ""}

								{this.props.graphVisible ? (
									<div>Graph</div>
								) : ""}
							</div>
						</div>

					</div>

					<div
						className={
								classNames({
									visible: this.props.rightSidebarVisible
								}, "right-sidebar")
							}
					>
						<div className="sidebar-header">
							<div className="sidebar-header-left">
								Console
							</div>

							<div className="sidebar-header-right">
								<Button
									minimal={true}
									icon="cross"
									onClick={() => { this.props.hideRightSidebar()}}
								/>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps({app}) {
	return {
		leftSidebarVisible: app.leftSidebarVisible,
		rightSidebarVisible: app.rightSidebarVisible,
		globalCodeVisible: app.globalCodeVisible,
		pathsVisible: app.pathsVisible,
		graphVisible: app.graphVisible
	};
}

export default {
	component: connect(mapStateToProps, {
		showLeftSidebar,
		hideLeftSidebar,
		showRightSidebar,
		hideRightSidebar,
		showGlobalCode,
		hideGlobalCode,
		showPaths,
		showGraph
	})(withRouter(App))
};
