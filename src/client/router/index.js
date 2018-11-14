import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import About from "../react/pages/about";
import Canvas from "../react/pages/canvas";

export default [
	{
		...App,
		routes: [
			{
				...Home,
				path: "/",
				exact: true,
				params: {
					name: "home"
				}
			}
		]
	}
];
