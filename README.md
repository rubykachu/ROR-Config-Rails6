# I/ Khởi tạo APP Rails với Webpack
1. Tạo mới ứng dụng Rails
`$ rails new evil_chat --skip-coffee --skip-sprockets --skip-turbolinks --webpack --database=postgresql  -T`
2. Tạo Autoprefix cho PostCSS
**Terminal:** `$ touch .browserslistrc`
3. Chỉnh sửa cấu hình khi `generator`
```Ruby
# config/application.rb
config.generators do |g|
  g.test_framework  false
  g.stylesheets     false
  g.javascripts     false
  g.helper          false
  g.channel         assets: false
end
```
4. Cấu hình load javascript và css
```Ruby
# views/layouts/application.html.erb
stylesheet_pack_tag 'application' # thay cho stylesheet_link_tag
javascript_pack_tag 'application' # thay cho javascript_include_tag
```
5. Cấu hình file `webpack.yml`
```yaml
default: &default
  source_path: frontend # thư mục chứa các component
  source_entry_path: packs
  public_output_path: packs
  cache_path: tmp/cache/webpacker
```
6. Thay đổi cấu trúc thư mục view
Hãy kéo thư mục `app/javascript` ra ngoài thư mục `root` và đổi tên javascript thành `frontend` như đã cấu hình trong file `webpack.yml`
Sau khi thay đổi cấu trúc thư mục view thì controller cần phải chỉ định lại thư mục view
```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  prepend_view_path Rails.root.join('frontend')
end
```
7. Chạy thử nghiệm

**Cách 1:**
- Vẫn sử dụng lệnh `rails s` để khởi động server. Ngoài ra mở thêm 1 cửa sổ `terminal` để chạy *webpack* với lệnh `bin/webpack-dev-server`. Mục đích để theo dõi thay đổi của file js mà không cần reload lại trang.

**Cách 2:**
- Ta có thể cấu hình dùng 1 lệnh và có thể chạy 2 dòng code trên cùng 1 lúc.
**Terminal::** `$ touch Procfile`
Trong Procfile ta nhập lệnh
```
server: bin/rails server
assets: bin/webpack-dev-server
```
- Và ngoài terminal ta gõ lệnh để chạy server `hivemind`

**Tạo trang web đầu tiên**
- Bây giờ ta tạo controller và chạy thử nghiệm `rails g controller pages home`
- Trong thư mục `frontend/packs` tạo file `application.css` ta sẽ viết css trong file này
```css
/* frontend/packs/application.css */
html, body {
  background: lightyellow;
}

```
- Trong file `frontend/packs/application.js`  ta sẽ *import css* và viết js vào trong này
```javascript
// frontend/packs/application.js
import './application.css'
```
**=> Như vậy ta đã cấu hình xong app Rails với webpack**
Ngoài ra ta có thể cấu hình 1 số rule convention trong quá trình code để hạn chế lỗi.
# II/ Cấu hình Lint JS và CSS
1. Cấu hình lint JS
File `package.json`
```yml
{
  "name": "boilerplate_webpack",
  "private": true,
  "dependencies": {
    "@rails/webpacker": "3.5"
  },
  "devDependencies": {
    "webpack-dev-server": "2.11.2",
    "babel-eslint": "^8.0.1",
    "eslint": "^4.8.0",
    "eslint-config-airbnb-base": "^12.0.1",
    "eslint-config-prettier": "^2.6.0",
    "eslint-import-resolver-webpack": "^0.8.3",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-prettier": "^2.3.1",
    "lint-staged": "^4.2.3",
    "pre-commit": "^1.2.2",
    "prettier": "^1.7.3"
  }
}
```
Tạo file  `.eslintrc` ngoài thư mục root.
**Terminal:** `$ touch .eslintrc`
Với các dòng lệnh sau
```yml
{
  "extends": ["eslint-config-airbnb-base", "prettier"],

  "plugins": ["prettier"],

  "env": {
    "browser": true
  },

  "rules": {
    "prettier/prettier": "error"
  },

  "parser": "babel-eslint",

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "modules": ["frontend", "node_modules"]
          }
        }
      }
    }
  }
}
```

2. Cấu hình Lint CSS
Trong file `package.json`
```yml
"devDependencies": {
    ...
    "stylelint": "^8.1.1",
    "stylelint-config-standard": "^17.0.0"
  }
```
```yml
"dependencies": {
    "@rails/webpacker": "^3.2.0",
    "normalize.css": "^7.0.0"
  },
  ...
```
**Terminal:** `$ touch .stylelintrc`
Trong file `.stylelintrc` với dòng lệnh
```yml
{
  "extends": "stylelint-config-standard"
}
```
3.  Kiểm tra rule khi git commit
- Để kiểm tra các convention khi git commit ta sử dụng `git hook`. Cấu hình
Trong file `package.json`
```yml
...
"scripts": {
    "lint-staged": "$(yarn bin)/lint-staged"
  },
  "lint-staged": {
    "config/webpack/**/*.js": [
      "prettier --write",
      "eslint",
      "git add"
    ],
    "frontend/**/*.js": [
      "prettier --write",
      "eslint",
      "git add"
    ],
    "frontend/**/*.css": [
      "prettier --write",
      "stylelint --fix",
      "git add"
    ]
  },
  "pre-commit": [
    "lint-staged"
  ],
  ...
```

> **Chú ý:** Với các cấu hình trong file package.json ta đều phải update lại.
> Ngoài Terminal gõ lệnh `yarn` để update các gói kèm theo vừa bổ sung
