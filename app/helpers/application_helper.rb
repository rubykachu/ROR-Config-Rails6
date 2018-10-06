module ApplicationHelper
  def component(component_name, locals = {}, &block)
    partial = component_name.split('/').last
    render("components/#{component_name}/#{partial}", locals, &block)
  end

  alias c component
end
