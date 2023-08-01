interface eventStrings {
	numberBuilder: {
		update: {
			originator: 'numberBuilder.update.originator';
			project: 'numberBuilder.update.project';
			volume: 'numberBuilder.update.volume';
			level: 'numberBuilder.update.level';
			type: 'numberBuilder.update.type';
			role: 'numberBuilder.update.role';
			number: 'numberBuilder.update.number';
			status: 'numberBuilder.update.status';
			revision: 'numberBuilder.update.revision';
		};
		enable: {
			originator: 'numberBuilder.enable.originator';
			project: 'numberBuilder.enable.project';
			volume: 'numberBuilder.enable.volume';
			level: 'numberBuilder.enable.level';
			type: 'numberBuilder.enable.type';
			role: 'numberBuilder.enable.role';
			number: 'numberBuilder.enable.number';
			status: 'numberBuilder.enable.status';
			revision: 'numberBuilder.enable.revision';
		};
	};
	system: {
		browser: {
			refresh: 'system.browser.refresh';
		};
	};
	read: {
		originator: {
			allOriginators: 'read.originator.allOriginators';
		};
		project: {
			allByOriginator: 'read.project.allByOriginator';
		};
		volume: {
			allBySchema: 'read.project.allBySchema';
		};
		level: {
			allByProject: 'read.level.allByProject';
		};
		type: { allByProject: 'read.type.allByProject' };

		role: { allByProject: 'read.role.allByProject' };
	};
}
