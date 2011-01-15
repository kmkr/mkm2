Dir[File.join(Rails.root, 'lib', 'sweepers', '**', '*.rb')].sort.each { |sweeper| require(sweeper) }
