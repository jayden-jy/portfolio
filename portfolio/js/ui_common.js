'use strict';

document.addEventListener("DOMContentLoaded", function() {
  registUI();
});

function registUI() {
  if (document.querySelector('.tab_container')) { _tabContents(); } // 접근성 탭
}


/**
  * @name _tabContents()
  * @description // 접근성 탭
  */
var _tabContents = function() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetId = this.getAttribute('aria-controls');
      const targetContent = document.getElementById(targetId);
      
      // 모든 탭 내용을 숨김
      document.querySelectorAll('.tab_content').forEach(content => {
        content.hidden = true;
      });
      
      // 모든 탭을 선택되지 않은 상태로 설정
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
      });
      
      // 선택한 탭을 선택된 상태로 설정
      this.setAttribute('aria-selected', 'true');
      
      // 선택한 탭 내용을 표시
      targetContent.hidden = false;
    });
    
    // 방향키로 탭 이동
    tab.addEventListener('keydown', function(event) {
      const keyCode = event.keyCode;
      const index = Array.from(tabs).indexOf(this);
      
      if (keyCode === 37 || keyCode === 38) { // 왼쪽 또는 위쪽 방향키
        const prevTab = tabs[index === 0 ? tabs.length - 1 : index - 1];
        prevTab.click(); 
        prevTab.focus();
      } else if (keyCode === 39 || keyCode === 40) { // 오른쪽 또는 아래쪽 방향키
        const nextTab = tabs[index === tabs.length - 1 ? 0 : index + 1];
        nextTab.click(); 
        nextTab.focus();
      }
    });
  });

  // 페이지 로딩 시 첫 번째 탭 내용 표시
  document.getElementById('menu1').hidden = false;
}