# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_mkm_2_session',
  :secret      => 'bd7e9edaa802fbf2a6fd72cc105a21cb083f8aa32112223c1ca82e5d9d37f7b2978cd2aea811ed4ffb833d36b88abf5b733086ce04be2bc4c66a0abd9b933aea'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
