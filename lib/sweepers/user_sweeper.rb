class UserSweeper < ActionController::Caching::Sweeper
  observe User

  def after_save(record)
	  clear_cache
  end

  def after_destroy(record)
	  clear_cache
  end

  def after_update(record)
	  clear_cache
  end

  private

  def clear_cache
	  Rails.cache.delete "users"
  end

end
