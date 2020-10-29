import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class AppConfig {

    public NAVER_COL = "#1EC800";
    public KAKAO_COL = "#ffeb00";
    public FACEBOOK_COL = "#1778f2";
 
    // mobile-login 폰트를 일괄로 설정값으로 관리할지, 개별로 관리할지 고민중
    public M_LOGIN_FONTST = "";

    public MAX_FILE_SIZE = 20 * 1024 * 1024;
    public MAX_FILES_SIZE = 200 * 1024 * 1024;

    public MAX_BOARD_LENGTH = 1000;              // 게시판 글자수
    public MAX_REVIEW_LENGTH = 300;              // 리뷰 글자수
    public MAX_CONTACT_TITLE_LENGTH = 20;        // 1:1문의 글자수
    public MAX_CONTACT_CONTENT_LENGTH = 300;     // 1:1문의 글자수
    public MAX_SHOP_RATING_LENGTH = 200;         // 샵 평가 글자수
    public MAX_COMMENT_LENGTH = 100;             // 댓글 글자수
    public MAX_RESERVATION_LENGTH = 200;         // 예약 코멘트 글자수
    public MAX_ORDER_COMMENT_LENGTH = 100;       // 구매하기 코멘트 글자수

    // public MAX_BOARD_LENGTH = 10;          // 게시판 글자수
    // public MAX_REVIEW_LENGTH = 12;         // 리뷰 글자수
    // public MAX_CONTACT_LENGTH = 14;        // 1:1문의 글자수
    // public MAX_SHOP_RATING_LENGTH = 16;    // 샵 평가 글자수
    // public MAX_COMMENT_LENGTH = 18;        // 댓글 글자수
    // public MAX_RESERVATION_LENGTH = 20;    // 예약 코멘트 글자수
    // public MAX_ORDER_COMMENT_LENGTH = 5;   // 구매하기 코멘트 글자수
}
