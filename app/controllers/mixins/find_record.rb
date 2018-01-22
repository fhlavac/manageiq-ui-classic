module Mixins
  module FindRecord
    def find_record(model, id)
      raise _("Invalid input") unless is_integer?(id)
      begin
        record = Rbac.filtered(model.where(:id => id)).first
      rescue ActiveRecord::RecordNotFound, StandardError => ex
        if @explorer
          self.x_node = "root"
          add_flash(ex.message, :error, true)
          session[:flash_msgs] = @flash_array.dup
        end
      end
      record
    end
  end
end
