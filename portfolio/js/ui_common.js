'use strict';
document.addEventListener("DOMContentLoaded", function() {
  registUI();
});

function registUI() {
  if (document.querySelector('.tab_container')) { _tabContents(); } // 접근성 탭
  if (document.querySelector('.wrap_layer')) { _layerPop(); } // 레이어팝업
}


/**
  * @name _tabContents()
  * @description // 접근성 탭
  */
const _tabContents = function() {
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

/**
  * @name _layerPop()
  * @description // 레이어 팝업
  */
const _layerPop = function() {
  const openPopupBtns = document.querySelectorAll('.openPopupBtn');
  const closePopupBtns = document.querySelectorAll('.closePopupBtn');

  function openPopup(event) {
    event.preventDefault();
    const targetPopupId = this.getAttribute('aria-controls');
    const targetPopup = document.getElementById(targetPopupId);
    if (targetPopup) {
      targetPopup.classList.add('show');
      document.body.classList.add('popup_open');
      targetPopup.querySelector('.closePopupBtn').focus();
    }
  }

  function closePopup(event) {
    event.preventDefault();
    const targetPopup = this.closest('.wrap_layer');
    if (targetPopup) {
      targetPopup.classList.remove('show');
      document.body.classList.remove('popup_open');
      const relatedOpenPopupBtnId = targetPopup.getAttribute('aria-labelledby');
      const relatedOpenPopupBtn = document.querySelector(`[aria-controls="${relatedOpenPopupBtnId}"]`);
      if (relatedOpenPopupBtn) {
        relatedOpenPopupBtn.focus();
      }
    }
  }

  openPopupBtns.forEach(btn => btn.addEventListener('click', openPopup));
  closePopupBtns.forEach(btn => btn.addEventListener('click', closePopup));
}


