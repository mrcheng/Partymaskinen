
(function (partyMachineConfig, $, undefined) {

	var partyAdminWebConfig = "live";
	// Change to "dev" when developing
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
		// Change to your localhost adress when developing
		partyMachineConfig.baseUrl = 'http://localhost:6217/Partymaskinen/';
		partyMachineConfig.pluginsBaseUrl = 'http://mrcheng.github.com/PartymaskinenPlugins/';
	}
	
} (
	window.partyMachineConfig = window.partyMachineConfig || {}
	)
);
