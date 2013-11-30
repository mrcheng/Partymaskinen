
(function (partyMachineConfig, $, undefined) {

	var partyAdminWebConfig = "live";
	// Change to "dev" when developing
	var partyConfig = "live";

	if (partyAdminWebConfig === "live") {
	    partyMachineConfig.partyFeedUrl = 'http://partymaskinen.azurewebsites.net/Party/JsonP';
	    partyMachineConfig.latestPartiesFeedUrl = 'http://partymaskinen.azurewebsites.net/party/listlatest';
	}
	else if (partyAdminWebConfig === "dev") {
		partyMachineConfig.partyFeedUrl = 'http://localhost:36466/Party/JsonP';
		partyMachineConfig.latestPartiesFeedUrl = 'http://localhost:36466/Party/listlatest';
	}
	
	if (partyConfig === "live") {
		partyMachineConfig.baseUrl = 'http://mrcheng.github.io/Partymaskinen/';
		partyMachineConfig.pluginsBaseUrl = 'http://mrcheng.github.io/PartymaskinenPlugins/';
	}
	else if (partyConfig === "dev") {
		// Change to your localhost adress when developing
		partyMachineConfig.baseUrl = 'http://localhost:1844/';
		partyMachineConfig.pluginsBaseUrl = 'http://localhost:1839/PartymaskinenPlugins/';
	}
	
} (
	window.partyMachineConfig = window.partyMachineConfig || {}
	)
);
