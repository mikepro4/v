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
import { Icon, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

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
	state = {
		transitionMinimimap: false
	}

	transitionMinimimap = () => {
		this.setState({
			transitionMinimimap: true
		})

		setTimeout(() => {
			this.props.showGraph();

			this.setState({
				transitionMinimimap: false
			})
		}, 200)
	}

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
								<Icon icon="menu" />
								<span className="sidebar-title">Workbook contents</span>
							</div>

							<div className="sidebar-header-right">
								<Button
									minimal={true}
									icon="cross"
									onClick={() => { this.props.hideLeftSidebar()}}
								/>
							</div>
						</div>

						<div className="dataset-list">

							<div className="dataset-search">
								<Icon icon="search" />
								<div className="search-title">Search datasets...</div>
							</div>

							<ul className="dummy-list">
								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-3"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-2"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-4"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-1"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-3"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-3"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-2"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-4"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-1"/>
								</li>

								<li className="single-dummy-item">
									<div className="dummy-icon"/>
									<div className="dummy-bar dummy-bar-3"/>
								</li>
							</ul>

						</div>
					</div>

					<div className="main-area">

						<div className="main-navigation-toolbar">
							<div className="nav-header-left">

								{!this.props.leftSidebarVisible ? (
									<Button
										minimal={true}
										icon="menu"
										text="Workbook contents"
										onClick={() => { this.props.showLeftSidebar()}}
									/>
								) : ''}

								<Button
									minimal={true}
									text="Global code"
									icon="code"
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
									icon="path"
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
									icon="graph"
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
										icon="console"
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
								<Button
									minimal={true}
									icon="cross"
									className="global-code-close"
									onClick={() => { this.props.hideGlobalCode()}}
								/>

								<div className="global-code-container">
									<div className="dummy-line-1"/>
									<div className="dummy-line-2"/>
									<div className="dummy-line-3"/>
									<div className="dummy-line-4"/>
									<div className="dummy-line-5"/>
									<div className="dummy-line-6"/>
								</div>
							</div>

							<div className="main-area-section-general">
								{this.props.pathsVisible ? (
									<div className="paths-section">

										<div className="paths-left-section">
											<div className={
													classNames({
														full: this.state.transitionMinimimap
													}, "path-mininigraph")
												}
											>
												<Button
													minimal={true}
													icon="fullscreen"
													className="fullscreen"
													onClick={() => { this.transitionMinimimap()}}
												/>
											</div>

											<div className="path-list">

												<div className="section-title">
													Transformation paths
												</div>

												<ul className="dummy-list">
													<li className="single-dummy-item single-dummy-item-active">
														<div className="dummy-icon"/>
														<div className="dummy-bar dummy-bar-3"/>
													</li>

													<li className="single-dummy-item">
														<div className="dummy-icon"/>
														<div className="dummy-bar dummy-bar-2"/>
													</li>

													<li className="single-dummy-item">
														<div className="dummy-icon"/>
														<div className="dummy-bar dummy-bar-4"/>
													</li>

													<li className="single-dummy-item">
														<div className="dummy-icon"/>
														<div className="dummy-bar dummy-bar-1"/>
													</li>

													<li className="single-dummy-item">
														<div className="dummy-icon"/>
														<div className="dummy-bar dummy-bar-3"/>
													</li>
												</ul>

											</div>
										</div>

										<div className="paths-right-section">
											<div className="path-container">
												<div className="path-title">Path 1</div>
												<div className="path-description">
													Path description here...
												</div>

												<div className="single-path-step"/>
												<div className="path-arrow"><Icon icon="arrow-down" /></div>
												<div className="single-path-step"/>
												<div className="path-arrow"><Icon icon="arrow-down" /></div>
												<div className="single-path-step"/>
												<div className="path-arrow"><Icon icon="arrow-down" /></div>
												<div className="single-path-step"/>
												<div className="path-arrow"><Icon icon="arrow-down" /></div>
												<div className="single-path-step"/>
											</div>
										</div>
									</div>
								) : ""}

								{this.props.graphVisible ? (
									<div className="graph-section">
										Graph
									</div>
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
								<Icon icon="console" />
								<span className="sidebar-title">Console</span>
							</div>

							<div className="sidebar-header-right">
								<Button
									minimal={true}
									icon="cross"
									onClick={() => { this.props.hideRightSidebar()}}
								/>
							</div>
						</div>

						<div className="console-content">
							console content
						</div>

						<div className="console-bottom">
						bottom
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
