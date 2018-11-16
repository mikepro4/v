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
import {
	Icon,
	Button,
	Intent,
	Popover,
  PopoverInteractionKind,
  PopoverPosition
} from "@blueprintjs/core";
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
		fullScreen: false,
		transitionMinimimap: false,
		activePath: 0,
		activeStep: 0,
		activeNode: 0,
		paths: [
			{
				id: 0,
				length: 3,
				name: "Path 1",
				steps: 6
			},
			{
				id: 1,
				length: 4,
				name: "Cleaning",
				steps: 2
			},
			{
				id: 2,
				length: 3,
				name: "Scenraio 1",
				steps: 5
			},
			{
				id: 3,
				length: 3,
				name: "Scneario 2",
				steps: 3
			},
			{
				id: 4,
				length: 4,
				name: "Analysis",
				steps: 4
			}
		]
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

	@keydown("esc")
	hideFullScreen() {
		this.setState({
			fullScreen: false
		})
	}

	@keydown("shift+1")
	toggleLeftSidebar() {
		if(this.props.leftSidebarVisible) {
			this.props.hideLeftSidebar()
		} else {
			this.props.showLeftSidebar()
		}
	}

	@keydown("shift+2")
	toggleGlobalCode() {
		if(this.props.globalCodeVisible) {
			this.props.hideGlobalCode()
		} else {
			this.props.showGlobalCode()
		}
	}

	@keydown("shift+3")
	toggleRightSidebar() {
		if(this.props.rightSidebarVisible) {
			this.props.hideRightSidebar()
		} else {
			this.props.showRightSidebar()
		}
	}

	@keydown("shift+p")
	openPaths() {
		this.props.showPaths()
		this.hideFullScreen()
	}

	@keydown("shift+g")
	openGraph() {
		this.props.showGraph()
		this.hideFullScreen()
	}

	@keydown("shift+down")
	selectNextPath() {
		if(this.state.activePath == 4) {
			this.setState({
				activePath: 0
			})
		} else {
			this.setState({
				activePath: this.state.activePath + 1
			})
		}

		this.setState({
			activeStep: 0
		})
		console.log(this.state.activePath)
	}

	@keydown("shift+up")
	selectPreviousPath() {
		if(this.state.activePath == 0) {
			this.setState({
				activePath: 4
			})
		} else {
			this.setState({
				activePath: this.state.activePath - 1
			})
		}

		this.setState({
			activeStep: 0
		})

		console.log(this.state.activePath)
	}

	@keydown("down")
	selectNextStep(event) {
		if(this.state.activeStep == this.state.paths[this.state.activePath].steps-1) {
			this.setState({
				activeStep: 0
			})
		} else {
			this.setState({
				activeStep: this.state.activeStep + 1
			})
		}
		console.log(this.state.activeStep)
		event.preventDefault()
		event.stopPropagation()
	}

	@keydown("up")
	selectPreviousStep(event) {
		if(this.state.activeStep == 0) {
			this.setState({
				activeStep: this.state.paths[this.state.activePath].steps -1
			})
		} else {
			this.setState({
				activeStep: this.state.activeStep - 1
			})
		}
		console.log(this.state.activeStep)
		event.preventDefault()
		event.stopPropagation()
	}

	@keydown("right")
	openFullScreen(event) {
		event.preventDefault()
		event.stopPropagation()
		this.setState({
			fullScreen: true
		})
	}

	@keydown("left")
	closeFullScreen(event) {
		event.preventDefault()
		event.stopPropagation()
		this.setState({
			fullScreen: false
		})
	}

	renderPath = (path, i) => {
		return (
			<li
				key={i}
				className={
					classNames({
						"single-dummy-item-active": this.state.activePath == i
					}, "single-dummy-item")
				}
			>
				<div className="dummy-icon"/>
				<div className={`dummy-bar dummy-bar-${path.length}`} />
			</li>
		)
	}

	renderPathSteps = (path) => {
		let steps = []
		for (var i = 0; i < path.steps; i++) {
			steps.push(this.renderPathStep(path, i))
		}
		return (
			<div className="steps-container">
				{steps}
			</div>
		)
	}

	renderPathStep = (path, i) => {
		return (
			<div
				key={i}
				className="single-step-container"
			>
				<div
					className="single-path-step"
					className={
						classNames({
							"single-path-step-active": this.state.activeStep == i
						}, "single-path-step")
					}
				>
					<Button
						minimal={true}
						icon="arrow-right"
						className="fullscreen"
						onClick={() => { this.setState({
								fullScreen: true
							})}
						}
					/>
				</div>

				<div className="path-arrow"><Icon icon="arrow-down" /></div>
			</div>
		)
	}

	getPopoverContents = () => {
		return (
			<div className="help-container">
				<div className="help-section">
					<div className="help-section-title">
						Switch main views
					</div>

					<ul className="help-action-list">
						<li className="help-action">
							<div className="help-action-description">
								Toggle Paths
							</div>

							<div className="key">Shift + P</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Toggle Graph
							</div>

							<div className="key">Shift + G</div>
						</li>
					</ul>
				</div>

				<div className="help-section">
					<div className="help-section-title">
						Manage helpers
					</div>

					<ul className="help-action-list">
						<li className="help-action">
							<div className="help-action-description">
								Toggle Workbook Contents
							</div>

							<div className="key">Shift + 1</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Toggle Global Code
							</div>

							<div className="key">Shift + 2</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Toggle Console
							</div>

							<div className="key">Shift + 3</div>
						</li>
					</ul>
				</div>

				<div className="help-section">
					<div className="help-section-title">
						Navigation
					</div>

					<ul className="help-action-list">
						<li className="help-action">
							<div className="help-action-description">
								Select next Path
							</div>

							<div className="key">Shift + Down</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Select previous Path
							</div>

							<div className="key">Shift + Up</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Select next step
							</div>

							<div className="key">Down</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Select previous step
							</div>

							<div className="key">Up</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Open selected step in full screen editor
							</div>

							<div className="key">Right</div>
						</li>

						<li className="help-action">
							<div className="help-action-description">
								Close full screen editor
							</div>

							<div className="key">Left</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="app-container">

				<div className="app-header">
					<div className="dark-header">
					</div>

					<div className="light-header">
						<Popover
	            popoverClassName="help"
	            portalClassName="portal"
	            enforceFocus={false}
	        	>
							<Button
								minimal={true}
								icon="help"
								text="Keyboard shortcuts"
							/>
              {this.getPopoverContents()}
	          </Popover>
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
								<div className="key">Shift+1</div>
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
									onClick={() => {
										this.props.showPaths()

										this.setState({
											fullScreen: false
										})
									}}
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
									onClick={() => {
										this.props.showGraph()

										this.setState({
											fullScreen: false
										})

									}}
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
								<div className="key">Shift+2</div>

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

								{
									this.state.fullScreen ? (
										<div className="full-screen-container">

											<div className="full-screen-header">

												<div className="full-screen-header-left">
													<Button
														minimal={true}
														icon="arrow-left"
														text="Back"
														className="button-back"
														onClick={() => { this.setState({
															fullScreen: false
														})}}
													/>
													<div className="full-screen-title">
														<Icon icon="code" />
														<span className="section-title">TRANSFORMATION EDITOR</span>
													</div>
												</div>

												<div className="close-button-container">

													<div className="key">ESC</div>

													<Button
														minimal={true}
														rightIcon="cross"
														onClick={() => { this.setState({
															fullScreen: false
														})}}
													/>

												</div>


											</div>

											<div className="full-screen-code-area">
												<div className="dummy-line-1"/>
												<div className="dummy-line-2"/>
												<div className="dummy-line-3"/>
												<div className="dummy-line-4"/>
												<div className="dummy-line-5"/>
												<div className="dummy-line-6"/>

												<div className="dummy-line-1"/>
												<div className="dummy-line-2"/>
												<div className="dummy-line-3"/>
												<div className="dummy-line-4"/>
												<div className="dummy-line-5"/>
												<div className="dummy-line-6"/>
											</div>

											<div className="full-screen-output">output</div>
										</div>
									) : ""
								}
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

												<div className="mg-nodes-container">
													<div className={
														classNames({
															full: this.state.transitionMinimimap
														}, "mg-node")
													}/>

													<div className="mg-node-divider"/>

													<div className={
														classNames({
															full: this.state.transitionMinimimap
														}, "mg-node")
													}/>

													<div className="mg-node-divider"/>

													<div className={
														classNames({
															full: this.state.transitionMinimimap
														}, "mg-node")
													}/>
												</div>
											</div>

											<div className="path-list">

												<div className="section-title">
													Transformation paths
												</div>

												<ul className="dummy-list">

													{this.state.paths.map((path,i) => {
															return this.renderPath(path, i)
														})
													}
												</ul>

											</div>
										</div>

										<div className="paths-right-section">
											<div className="path-container">
												<div className="path-title">{this.state.paths[this.state.activePath].name}</div>
												<div className="path-description">
													Path description here...
												</div>

												{this.renderPathSteps(this.state.paths[this.state.activePath])}

											</div>
										</div>
									</div>
								) : ""}

								{this.props.graphVisible ? (
									<div className="graph-section">
										<div className="graph-nodes-container">
											<div className="graph-node">

												node content

												<Button
													minimal={true}
													icon="fullscreen"
													className="fullscreen"
													onClick={() => { this.setState({
															fullScreen: true
														})}
													}
												/>
											</div>

											<div className="graph-node-divider"/>

											<div className="graph-node">

												node content

												<Button
													minimal={true}
													icon="fullscreen"
													className="fullscreen"
													onClick={() => { this.setState({
															fullScreen: true
														})}
													}
												/>
											</div>

											<div className="graph-node-divider"/>

											<div className="graph-node">

												node content

												<Button
													minimal={true}
													icon="fullscreen"
													className="fullscreen"
													onClick={() => { this.setState({
															fullScreen: true
														})}
													}
												/>
											</div>
										</div>
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
								<div className="key">Shift + 3</div>

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
