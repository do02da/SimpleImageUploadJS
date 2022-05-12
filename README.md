# SimpleImageUploadJS
***
## Demo
```html
<!DOCTYPE html>
<html>
    <head>
        <title>SimpleImageUploadJS</title>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>

        <link rel="stylesheet" href="./simpleImageUploadJS.css" >
    <body>
        <div id="preview"></div>

        <input id="image-input" type="file" accept="image/*" multiple>
        
        <script src="./simpleImageUploadJS.js"></script>
        <script>         
            let simpleImageUpload = new SimpleImageUpload({
                // Options
            });
        </script>
    </body>
</html>
```
***
## Options
| 옵션 | 기본값 | 비고 |
| --- | --- | --- |
| img_preview | #preview | 이미지 미리보기 Element |
| img_input | #image-input |  이미지 파일 Input Element |
| file_size_limit | 1024 * 1024 * 10 (10MB) | 파일 용량 제한 |
| file_num_limit | 2 | 파일 개수 제한 |
| allow_filetype |  | 파일 확장자 제한 |
| preview_width | 100px | 이미지 미리보기 너비 |
| preview_height | 100px | 이미지 미리보기 높이 |

### Usage
``` javascript
let simpleImageUpload = new SimpleImageUpload({
    img_preview: "#image-preview",
});
```