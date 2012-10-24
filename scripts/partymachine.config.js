
(function (partyMachineConfig, $, undefined) {

	var partyAdminWebConfig = "live";
	var partyConfig = "live";

	if (partyAdminWebConfig === "live") {
		partyMachineConfig.partyFeedUrl = 'http://partymaskinen.se/Party/JsonP';
		partyMachineConfig.latestPartiesFeedUrl = 'http://partymaskinen.se/party/listlatest';
	}
	else if (partyAdminWebConfig === "dev") {
		partyMachineConfig.partyFeedUrl = 'http://localhost:36466/Party/JsonP';
		partyMachineConfig.latestPartiesFeedUrl = 'http://localhost:36466/Party/listlatest';
	}
	
	if (partyConfig === "live") {
		partyMachineConfig.baseUrl = 'http://mrcheng.github.com/Partymaskinen/';
		partyMachineConfig.pluginsBaseUrl = 'http://mrcheng.github.com/PartymaskinenPlugins/';
	}
	else if (partyConfig === "dev") {
		partyMachineConfig.baseUrl = 'http://localhost:10397/Partymaskinen/';
		partyMachineConfig.pluginsBaseUrl = 'http://localhost:11111/PartymaskinenPlugins/';
	}
	
} (
	window.partyMachineConfig = window.partyMachineConfig || {}
	)
);
