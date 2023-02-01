# How to call: make setupios_localsdk path="/Users/levi/code/customerio-ios"
setupios_localsdk:
	cd ios/ && INSTALL_IOS_SDK_LOCAL=$(path) pod update && cd ../

# How to call: make setupios_branchsdk branch_name="levi/gist-event-listeners"
setupios_branchsdk:
	cd ios/ && INSTALL_IOS_SDK_BRANCH=$(branch_name) pod update && cd ../