class SimpleImageUpload {
    // Options
    img_preview = document.querySelector("#preview");   // 이미지 미리보기 Element
    img_input = document.querySelector("#image-input"); // 이미지 파일 Input Element

    file_size_limit = 1024 * 1024 * 10;                 // 파일 용량 제한
    file_num_limit = 2;                                 // 파일 개수 제한
    allow_filetype = ['jpg', 'jpeg', 'png', 'gif'];     // 파일 확장자 제한

    preview_width = "100px";                            // 이미지 미리보기 너비
    preview_height = "100px";                           // 이미지 미리보기 높이
    // Options End

    _imageIdx = 0;
    tmpImageFiles = {};

    constructor(options) {
        if (options !== undefined) {
            if (options.img_preview !== undefined) this.img_preview = document.querySelector(options.img_preview);
            if (options.img_input !== undefined) this.img_input = document.querySelector(options.img_input);
            if (options.file_size_limit !== undefined) this.file_size_limit = options.file_size_limit;
            if (options.file_num_limit !== undefined) this.file_num_limit = options.file_num_limit;
            if (options.allow_filetype !== undefined) this.allow_filetype = options.allow_filetype;
            if (options.preview_width !== undefined) this.preview_width = options.preview_width;
            if (options.preview_height !== undefined) this.preview_height = options.preview_height;
        }

        this.imgInputEvnet();
    }

    imgInputEvnet() {
        // image input이 정의되어있다면
        if (this.img_input !== null) {
            this.img_input.addEventListener("change", (e) => {
                // 파일 개수 제한 유효성 검사
                if (this.fileNumValidation(e.target.files.length)) {
                    for (let i = 0; i < e.target.files.length; i++) {
                        let file = e.target.files[i];
                        
                        // 파일 크기, 확장자 유효성 검사
                        if (this.fileSizeValidation(file) && this.fileExtValidation(file)) {
                            this.tmpImageFiles[this._imageIdx] = file;
                            this.appendToPreview(file, this._imageIdx++);
                        }
                    }

                    this.img_input.value = "";
                }
            });
        } else {
            alert("ERROR : 이미지 Input이 지정되지 않았습니다.")
        }
    }

    /**
     * 파일 개수 제한 유효성 검사
     * @see     file_num_limit 파일 개수 제한
     * @param   {*} inputFileCount 
     * @returns true : 통과 | false
     */
    fileNumValidation(inputFileCount) {
        const registeredImgCount = this.img_preview.childElementCount; // 이미 등록한 파일의 개수

        if (inputFileCount + registeredImgCount > this.file_num_limit) {
            alert("이미지는 최대 " + this.file_num_limit + "개만 업로드 가능합니다.");

            this.img_input.value = "";

            return false;
        } else {
            return true;
        }
    }

    /**
     * 파일 크기 유효성 검사
     * @see     file_size_limit 파일 크기 제한
     * @param   {*} file 
     * @returns true : 통과 | false
     */
    fileSizeValidation(file) {
        if (file.size > this.file_size_limit) {
            alert((this.file_size_limit / 1024 / 1024 * 100) / 100 + 'MB 이하 파일만 등록할 수 있습니다.\n\n' + '현재파일 용량 : ' + (Math.round(file.size / 1024 / 1024 * 100) / 100) + 'MB');

            this.img_input.value = "";

            return false;
        } else {
            return true;
        }
    }

    /**
     * 파일 확장자 유효성 검사
     * @see     allow_filetype
     * @param   {*} file 
     * @returns 
     */
    fileExtValidation(file) {
        let ext = file.name.split('.').pop().toLowerCase();

        if (this.allow_filetype.includes(ext)) {
            return true;
        } else {
            alert(this.allow_filetype + " 파일만 업로드 가능합니다.");

            this.img_input.value = "";

            return false;
        }
        
    }

    /**
     * 사용자가 추가한 이미지를 Preview에 추가
     * @param {*} file 
     * @param {*} _imageIdx 
     */
    appendToPreview(file, _imageIdx) {
        const reader = new FileReader();

        let that = this;
        
        reader.onload = function(event) {
            let imgDivTag = document.createElement('div');
            imgDivTag.className = 'img-div'
            imgDivTag.style.width = that.preview_width;
            imgDivTag.style.height = that.preview_height;

            // 이미지 태그
            let imgTag = document.createElement('img');
            imgTag.className = 'preview-img';
            imgTag.src = event.target.result;

            // 이미지 삭제 버튼
            let imgDelBtn = document.createElement('button');
            imgDelBtn.className = 'img-delete-btn';
            imgDelBtn.textContent = 'X';
            imgDelBtn.dataset.imgIdx = _imageIdx;
            
            // 이미지 삭제 버튼 클릭 이벤트 등록
            imgDelBtn.addEventListener("click", (e) => that.imageDelete(e));

            // 이미지 Div 태그에 이미지 태그와 이미지 삭제 버튼 등록
            imgDivTag.append(imgDelBtn);
            imgDivTag.append(imgTag);

            that.img_preview.append(imgDivTag);
        }

        reader.readAsDataURL(file);
    }

    imageDelete(e) {
        let imgIdx = e.target.dataset.imgIdx;

        delete this.tmpImageFiles[imgIdx];

        e.target.parentNode.remove();
    }
}