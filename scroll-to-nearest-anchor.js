// getting closest to the clicked location on the page would be great
const SCROLL_SCRIPT = `
(function() {
  let anchors = document.anchors;
  let closestAnchorDistance;
  let anchorClosestToTop;

  for(let anchor of anchors) {
      let clientRect = anchor.getBoundingClientRect();
      if(!anchorClosestToTop) {
          anchorClosestToTop = anchor;
          closestAnchorDistance = Math.abs(clientRect.y);
      } else {
          if(Math.abs(clientRect.y) < closestAnchorDistance) {
              closestAnchorDistance = Math.abs(clientRect.y);
              anchorClosestToTop = anchor;
          }
      }
  }

  if(anchorClosestToTop != null) {
      window.location.hash = anchorClosestToTop.name;
  }
})();
`;

function scrollToNearestAnchor(info, tab) {
    browser.tabs.executeScript(tab.id, {
        code: SCROLL_SCRIPT
    });
}

browser.menus.create({
    id: 'scroll-to-nearest-anchor',
    title: 'Scroll to nearest anchor',
    contexts: ['all'],
    onclick: scrollToNearestAnchor
});
