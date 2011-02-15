class CommentMailer < ActionMailer::Base
  default :from => "noreply@mkm.tc"

  def comment_mail(comment)
    @comment = comment
    emails = []
    #article.comments.each do |comment|
    #  emails << comment.email unless comment.email.blank?
    #end

    #User.all.each do |user|
    #  emails << user.email
    #end
    emails << "krismikael@gmail.com"

    emails.uniq!
    
    mail(:from => 'noreply@mkm.tc', :to => "krismikael@gmail.com", :subject => "#{comment.author} posted a comment to #{comment.article.title}!")
   # emails.each do |email|
   # end
  end
end
