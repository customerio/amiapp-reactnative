pod_update: # Run when you update the Podfile
	pod update --repo-update --project-directory=ios

pod_install: # Run when you have not updated the Podfile, you just need to install iOS dependencies 
	pod install --repo-update --project-directory=ios

# Install the RN SDK from a branch name. 
# How to call: make rn_sdk_install_branch branch_name="levi/gist-event-listeners"
rn_sdk_install_branch: 
	yarn add https://github.com/customerio/customerio-reactnative/tarball/$(branch_name)