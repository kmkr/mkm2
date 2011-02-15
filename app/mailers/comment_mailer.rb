class CommentMailer < ActionMailer::Base
  default :from => "noreply@mkm.tc"

  def comment_mail(comment)
    @comment = comment
    emails = []
    article.comments.each do |comment|
      emails << comment.email unless comment.email.blank?
    end

    User.all.each do |user|
      emails << user.email
    end

    emails.uniq!
    
    emails.each do |email|
      mail(:to => email, :subject => "#{comment.author} posted a comment to '#{comment.article.title}'").deliver
    end
  end
end
