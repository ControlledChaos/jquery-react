# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "jasmine-core"
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Rajan Agaskar", "Davis W. Frank", "Christian Williams"]
  s.date = "2013-12-16"
  s.description = "Test your JavaScript without any framework dependencies, in any environment, and with a nice descriptive syntax."
  s.email = "jasmine-js@googlegroups.com"
  s.homepage = "http://pivotal.github.com/jasmine"
  s.licenses = ["MIT"]
  s.require_paths = ["lib"]
  s.rubyforge_project = "jasmine-core"
  s.rubygems_version = "2.0.3"
  s.summary = "JavaScript BDD framework"

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<sauce-connect>, [">= 0"])
      s.add_development_dependency(%q<jasmine_selenium_runner>, [">= 0"])
      s.add_development_dependency(%q<compass>, [">= 0"])
    else
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<sauce-connect>, [">= 0"])
      s.add_dependency(%q<jasmine_selenium_runner>, [">= 0"])
      s.add_dependency(%q<compass>, [">= 0"])
    end
  else
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<sauce-connect>, [">= 0"])
    s.add_dependency(%q<jasmine_selenium_runner>, [">= 0"])
    s.add_dependency(%q<compass>, [">= 0"])
  end
end