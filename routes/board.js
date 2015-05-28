'use strict';

var express    = require('express');


var validator  = require('../config/validator');
var middleware = require('../middleware');
var utils      = require('../utils');
var bgBoard    = require('../static/board');

var Router     = express.Router();

Router.route('/board')

	/**
	 * Get board image
	 *
	 * returns:
	 *   png image of given board
	 */
	.post(function(req, res, next) {
		console.log("request received");
		console.log(req.body);

		return validator.board(req, function(err) {
			if(err) {
				return next(utils.error(601, err));
			}

			return utils.export.generateImage(utils.export.getJadeOptions(req.body), utils.export.getWebshotOptions(req.body), function(err, data) {
				if(err) {
					return next(err);
				}
				
				return res.status(200).contentType('application/octet-stream').send(data);
			});
		});	
	})

module.exports = Router;
