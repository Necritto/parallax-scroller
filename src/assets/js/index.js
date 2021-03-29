const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const container = document.querySelector(".container");

class SuperScroller {
  constructor(elem, { sourceElement, reactOnTargetElementSize }) {
    this.elem = elem;
    this.sourceElement = sourceElement;
    this.reactOnTargetElementSize = reactOnTargetElementSize;
    this.scroller();
  }

  setTop(top) {
    this.elem.style.top = top + "px";
  }

  scrollWithTargetElementSize(offsetHeight, invisibleScrollingPart) {
    const scrollPercent = this.sourceElement.scrollTop / invisibleScrollingPart;

    this.setTop(
      scrollPercent * offsetHeight - scrollPercent * this.elem.clientHeight
    );
  }

  scrollWithoutTargetElementSize(offsetHeight, invisibleScrollingPart) {
    const scrollPercent = this.sourceElement.scrollTop / invisibleScrollingPart;

    this.setTop(offsetHeight * scrollPercent);
  }

  scroller() {
    const offsetHeight = this.sourceElement.offsetHeight;
    const invisibleScrollingPart =
      this.sourceElement.scrollHeight - offsetHeight;

    this.sourceElement.addEventListener(
      "scroll",
      this.reactOnTargetElementSize
        ? this.scrollWithTargetElementSize.bind(
            this,
            offsetHeight,
            invisibleScrollingPart
          )
        : this.scrollWithoutTargetElementSize.bind(
            this,
            offsetHeight,
            invisibleScrollingPart
          )
    );
  }
}

new SuperScroller(red, {
  sourceElement: container,
  reactOnTargetElementSize: true,
});

new SuperScroller(blue, {
  sourceElement: container,
  reactOnTargetElementSize: false,
});
