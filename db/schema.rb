# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101231160134) do

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "published_date"
    t.boolean  "published"
    t.integer  "country_id"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zoom_level"
  end

  create_table "assets", :force => true do |t|
    t.integer  "article_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "galleryitem_file_name"
    t.string   "galleryitem_content_type"
    t.integer  "galleryitem_file_size"
    t.datetime "galleryitem_updated_at"
    t.text     "galleryitem_caption"
    t.integer  "galleryitem_position"
    t.boolean  "candidate_for_random"
  end

  create_table "comments", :force => true do |t|
    t.string   "author"
    t.string   "email"
    t.text     "body"
    t.integer  "article_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "continents", :force => true do |t|
    t.string   "title"
    t.integer  "priority"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "countries", :force => true do |t|
    t.string   "title"
    t.float    "longitude"
    t.float    "latitude"
    t.integer  "zoom_level"
    t.integer  "continent_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "login",                     :limit => 40
    t.string   "name",                      :limit => 100, :default => ""
    t.string   "email",                     :limit => 100
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_token",            :limit => 40
    t.datetime "remember_token_expires_at"
  end

  add_index "users", ["login"], :name => "index_users_on_login", :unique => true

end
