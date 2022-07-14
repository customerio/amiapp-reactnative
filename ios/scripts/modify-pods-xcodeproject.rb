require 'xcodeproj'

project_path = 'Pods/Pods.xcodeproj'
project = Xcodeproj::Project.open(project_path)

cio_target_names = [
  'CustomerIOTracking',
  'CustomerIOMessagingPushAPN',
  'CustomerIOMessagingPush'
]

project.targets.each do |target|
  if cio_target_names.include? target.name 
    puts "Modifying target #{target.name}"

    target.build_configurations.each do |config|
      puts "Setting build config settings for #{target.name}"
      config.build_settings['APPLICATION_EXTENSION_API_ONLY'] ||= 'NO'
    end
  end  
end

project.save