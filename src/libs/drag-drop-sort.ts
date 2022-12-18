export default class DragAndDropListLib {
  /*        __----------------------------__       */
  /*-=====_| INITIALIZING GLOBAL VARIABLES |_=====-*/
  /*       --------------------------------        */

  private dragInitialized = false;
  private $body;
  private callBackfn;
  private containerElement;
  private $box;
  private $key;
  private $boxClone;
  private initialMouseXPosition;
  private containerBounds: any = {};
  private boxBounds;
  private mouseInitialPosition;
  private limits: any = {};
  private $container;
  private lastYPosition;
  private autoScrollZones = { 5: 0, 10: 0, 90: 0, 95: 0};//the key reffers to the percentage of the screen height
  private setIntervalKey;
  private autoScroll = { swiftConstant: 0, continue: false };
  private elementWithScroll;
  private contextOfElementWithScroll;
  private dataDragName;
  private sortedIds;
  private fromIconToBottom;
  private pointerDirection;
  private lastMouseYPosition;

  /*        __----------------__        */
  /*-=====_| SHORTCUT FUNCTIONS |_=====-*/
  /*       ---------------------        */

  //setting some shortcuts for querySelector functions
  private queryAll;
  private stop = (ev) => ev.stopPropagation();
  private getProperty = ($element, property): any => parseInt(getComputedStyle($element).getPropertyValue(property)) || getComputedStyle($element).getPropertyValue(property);

  constructor() {}

  /*        __---------------------------__       */
  /*-=====_| SETTING UP UTILITY FUNCTIONS |_=====-*/
  /*       -------------------------------        */

  private mousemoveListener = (event) => this.drag(event);

  private mouseupListener = (event) => this.dragend(event);

  private mousedownListener = (event) => this.dragstart(event);

  private hasScroll (element) {
    const { scrollTop } = element;

    if (scrollTop) return true;

    element.scrollTop += 10;

    if (element.scrollTop) {
      element.scrollTop = 0;
      return true;
    }
    else {
      return false;
    }
  }

  private scrollWidth () {
    return this.hasScroll(this.$container)
      ? this.$container.scrollWidth - this.$container.offsetWidth + this.containerBounds.containerXBorderWidth * 2
      : 0;
  }

  private settingBorderRadiusOfTheLastNode () {
    const children = [...this.$container.children].filter(child => !child.classList.contains('is-clone'));
    const lastChildren = children.pop();

    children.forEach($child => $child.style.removeProperty('border-radius'));
    lastChildren.style.borderRadius = `0 0 ${this.containerBounds.bottomRadius}`;
  }

  private extractContainerBounds () {
    const containerInfo = this.$container.getBoundingClientRect();
    const topRadius = this.getProperty(this.$container,"border-top-left-radius");
    const bottomRadius = this.getProperty(this.$container, "border-bottom-left-radius");

    //filtering the infos of the container and passing those we need in containerBounds variable
    this.containerBounds.containerTopBorderWidth = parseInt(this.getProperty(this.$container,"border-top-width"));
    this.containerBounds.containerXBorderWidth = parseInt(this.getProperty(this.$container,"border-left-width"));
    this.containerBounds.containerBottomBorderWidth = parseInt(this.getProperty(this.$container,"border-bottom-width"));
    this.containerBounds.topRadius = topRadius ? `${topRadius - 2}px ${topRadius - 2}px` : 0;
    this.containerBounds.bottomRadius = bottomRadius ? `${bottomRadius - 2}px ${bottomRadius - 2}px` : 0;
    this.containerBounds.top = scrollY + containerInfo.top + this.mouseInitialPosition + this.containerBounds.containerTopBorderWidth;
    this.containerBounds.bottom = scrollY + containerInfo.bottom - this.mouseInitialPosition - this.containerBounds.containerBottomBorderWidth;
    this.containerBounds.left = containerInfo.left;
    this.containerBounds.right = containerInfo.right;
  }

  private extractInitialMousePosition ($box, event) {
    const boxInfo = $box.getBoundingClientRect();
    const iconInfo = event.target.getBoundingClientRect();
    const iconHeight = iconInfo.height;
    const iconOffsetToBoxTop = iconInfo.top - boxInfo.top;
    const iconOffsetToBoxBottom =  boxInfo.bottom - iconInfo.bottom;

    this.mouseInitialPosition = iconHeight / 2 + iconOffsetToBoxTop;
    this.fromIconToBottom = iconHeight / 2 + iconOffsetToBoxBottom;
  }

  private getLimitValues () {
    this.limits.top = this.containerBounds.top - this.mouseInitialPosition;
    this.limits.bottom = this.containerBounds.bottom - this.fromIconToBottom;
  }

  private extractAutoScrollZones () {
    const decimalToPercentage = (decimal) => {
      const percentageRatio = 100;
      return decimal / percentageRatio;
    };

    const elementHeight = this.elementWithScroll.clientHeight + this.elementWithScroll.clientTop;
    Object.keys(this.autoScrollZones).forEach(percetage => this.autoScrollZones[percetage] = Math.floor(elementHeight * decimalToPercentage(percetage)));
  }

  private doScrollWhileDragging (event?) {
    if (!event) {
      if (this.setIntervalKey) clearInterval(this.setIntervalKey);
      this.setIntervalKey = null;
      return;
    }

    const scrollZoneTillScreenTop = (percetage) => {
      const distanceToTheTopOfTheViewPort = Math.abs(this.elementWithScroll.getBoundingClientRect().top) - this.contextOfElementWithScroll.scrollTop;

      if (this.elementWithScroll === this.contextOfElementWithScroll && distanceToTheTopOfTheViewPort !== 0) {
      //When only the drag container itself has scroll
        return this.autoScrollZones[percetage] + this.elementWithScroll.getBoundingClientRect().top;
      } else if (this.elementWithScroll !== this.contextOfElementWithScroll) {
      //When both the drag container and it's context has scroll
        return this.autoScrollZones[percetage] + this.elementWithScroll.getBoundingClientRect().top;
      }  else {
      //In case of the container itself does not have scroll and it's ancestor has scroll and it's so big that it cannot be contained in the screen
        return this.autoScrollZones[percetage] + distanceToTheTopOfTheViewPort;
      }
    }

    const mouseY = event.y;
    let newSwiftConstant = 0;

    if (mouseY < scrollZoneTillScreenTop(5)) {
      this.autoScroll.continue = true;
      newSwiftConstant = -2;
    } else if (mouseY < scrollZoneTillScreenTop(10)) {
      this.autoScroll.continue = true;
      newSwiftConstant = -1;
    } else if (mouseY > scrollZoneTillScreenTop(95)) {
      this.autoScroll.continue = true;
      newSwiftConstant = 2;
    } else if (mouseY > scrollZoneTillScreenTop(90)) {
      this.autoScroll.continue = true
      newSwiftConstant = 1;
    } else {
      this.autoScroll.continue = false;
    }

    if (newSwiftConstant === this.autoScroll.swiftConstant) return;
    else this.autoScroll.swiftConstant = newSwiftConstant;

    const generateAutoScrollCallBack = (event) => {
      this.elementWithScroll.scrollTop += this.autoScroll.swiftConstant;
      this.sort(event);
    };

    if (this.autoScroll.continue && !this.setIntervalKey) {
      clearInterval(this.setIntervalKey);
      this.setIntervalKey = setInterval(() => generateAutoScrollCallBack(event), 0)
    } else if (this.autoScroll.continue) {
      clearInterval(this.setIntervalKey);
      this.setIntervalKey = setInterval(() => generateAutoScrollCallBack(event), 0);
    } else if (!this.autoScroll.continue) {
      if (this.setIntervalKey) clearInterval(this.setIntervalKey);
      this.setIntervalKey = null;
    }
  }

  private cursorStyle (style) {
    style === 'default'
    ? document.documentElement.style.removeProperty('cursor')
    : document.documentElement.style.setProperty('cursor', style);
  };

  private getElementWithScroll (x, y, shouldReturn?) {
    const allElementsFromTheEventCenter = document.elementsFromPoint(x, y);
    let [ firstElement, context ] =  [...allElementsFromTheEventCenter].filter((node: any) => this.hasScroll(node) && node.style.overflow !== 'hidden').slice(0, 2);

    if (!firstElement) firstElement = document.documentElement;
    if (!context) context = firstElement;

    if (shouldReturn) return [ firstElement, context ];

    this.elementWithScroll = firstElement;
    this.contextOfElementWithScroll = context;
  }

  private extractDataName () {
    this.dataDragName = this.$box.getAttribute('drag-name');
  }

  private generateDragDivisors () {
    const $el = document.createDocumentFragment();

    let $divisorTop: any = document.createElement('div');
    $divisorTop.setAttribute('drag-type', 'divisor');
    $divisorTop.setAttribute('drag-divisor', 'top');
    $divisorTop.style = `
      position: absolute;
      content: '';
      height: 50%;
      top: 0;
      left: 0;
      z-index: 2000;
      width: 100%;
      // background-color: red;
    `;

    let $divisorBottom: any = document.createElement('div');
    $divisorBottom.setAttribute('drag-type', 'divisor');
    $divisorBottom.setAttribute('drag-divisor', 'bottom');
    $divisorBottom.style = `
      position: absolute;
      content: '';
      height: 50%;
      bottom: 0;
      left: 0;
      z-index: 2000;
      width: 100%;
      // background-color: blue;
    `;

    $el.appendChild($divisorTop);
    $el.appendChild($divisorBottom);

    $divisorTop = null;;
    $divisorBottom = null;

    return $el
  }

  private getSortedIds (shouldReturn?) {

    const idArray = [...this.$container.querySelectorAll(`[drag-name="${this.dataDragName}"]`)]
    .map($node => {
      return $node.getAttribute('drag-id');
    });

    if (shouldReturn) return idArray;
    else this.sortedIds = idArray;
  }

  private getAditionalDragInfo () {
    return this.$container
    .getAttributeNames()
    .filter(attr => attr.startsWith('drag-info'))
    .reduce((obj, attr) => ({...obj, [attr.split('-').pop()]: this.$container.getAttribute(attr)}), {});
  }

  private makeLockedItemsNotDraggable () {
    this.queryAll('[drag-lock="true"] [drag-type="key"]').forEach($node => {
      $node.style.setProperty('display', 'none');
    })
  }

  private makeLockedItemsHigherZIndex () {
    this.queryAll('[drag-lock="true"]').forEach($node => {
      $node.style.zIndex = 1;
    })
  }

  /*        __---------------------__       */
  /*-=====_| BOOTSTRAP AND SHUTDOWN |_=====-*/
  /*       -------------------------        */

  bootstrap (data: { callBackFn, containerElement }) {
    if (this.dragInitialized) return;

    const { callBackFn, containerElement } = data;

    this.containerElement = containerElement;
    //starting utils
    this.queryAll = this.containerElement.querySelectorAll.bind(this.containerElement);

    //setting callback
    this.callBackfn = callBackFn;

    //setting body
    this.$body = document.body;

    //reset everything to prevent bugs
    this.shutdown();

    //putting the listeners on the boxes
    this.queryAll('[drag-type="key"]').forEach($key => {
      $key.setAttribute('draggable', 'false');
      $key.addEventListener('mousedown', this.mousedownListener);
    });

    //Setiting the the drag item to position relative
    this.queryAll('[drag-type="item"]').forEach($node => {
      const targetCSSProperty = 'position';
      const undesirablePropertyValue = 'static';
      if (this.getProperty($node, targetCSSProperty) === undesirablePropertyValue) $node.style.position = 'relative';
    })

    //Setiting the the drag container to position relative
    this.queryAll('[drag-type="container"]').forEach($node => {
      const targetCSSProperty = 'position';
      const undesirablePropertyValue = 'static';
      if (this.getProperty($node, targetCSSProperty) === undesirablePropertyValue) $node.style.position = 'relative';
    })

    this.makeLockedItemsNotDraggable();
    this.makeLockedItemsHigherZIndex();
  }

  shutdown () {
    //removing the listeners of the boxes
    this.queryAll('[drag-type="key"]').forEach($key => {
      $key.removeEventListener('mousedown', this.mousedownListener);
    });
  }

  /*        __-----------------------__       */
  /*-=====_| LOGIC FOR THE DRAG IMAGE |_=====-*/
  /*       ---------------------------        */

   private dragstart (event) {
    this.dragInitialized = true;
    this.stop(event);
    this.cursorStyle('grabbing');
    this.initialMouseXPosition = event.x;
    const $key = event.currentTarget

    //get the closest element with scroll we use that to do scroll while dragging
    this.getElementWithScroll(event.x, event.y);

    //Getting those zones to know when trigger the autoScroll and it's intensity
    this.extractAutoScrollZones();

    //setting initial style for drag key
    [...this.queryAll('[drag-type="key"]')].filter($node => $node !== $key).forEach($key => $key.style = 'opacity: 0; cursor: grabbing');

    //getting the box that is being dragged and setting its opacity 0 and getting the container element
    this.$box = event.target.closest('[drag-type="item"]');
    this.$box.style.opacity = 0;
    this.$box.style.pointerEvents = 'none';
    this.$box.classList.add('is-dragging');
    this.$container = this.$box.closest('[drag-type="container"]');

    //could be a drag container inside a drag container so we need to give them a name to
    this.extractDataName();

    //and then sort the items and store them in memory to compare them
    this.getSortedIds();

    //This generates the divisors and inserts them into the drag-item
    this.$container.querySelectorAll(`[drag-name="${this.dataDragName}"]:not(.is-dragging, [drag-lock="true"])`).forEach($node => {
      $node.appendChild(this.generateDragDivisors());
    });

    //extracing the half of the box height
    this.extractInitialMousePosition(this.$box, event);

    //getting the infos of the container that will support the drag
    this.extractContainerBounds();

    //For a DOM manipulation porpouse this should be done with JS instead of normal CSS
    this.settingBorderRadiusOfTheLastNode();

    //getting boxBounds
    this.boxBounds = this.$box.getBoundingClientRect();

    //getting the transform limits
    this.getLimitValues();

    //creating the clone of the box
    if (!document.querySelector('.is-clone')) {
      this.$boxClone = this.$box.cloneNode(true);

      this.$boxClone.classList.add('is-clone');

        //making the clone draggable
      this.$boxClone.style = `
      position: absolute;
      opacity: 0.7;
      pointer-events: none;
      user-select: none;
      z-index: 1000;
      transition: none;
      box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 0.25);
      width: ${ this.containerBounds.right - this.containerBounds.left - this.containerBounds.containerXBorderWidth * 2 + this.scrollWidth()}px;
    `;

  //adding the clone to the container
  this.$body.appendChild(this.$boxClone)
  this.$boxClone.style.top = `${scrollY + this.boxBounds.top}px`;
  this.$boxClone.style.left = `${this.containerBounds.left + this.containerBounds.containerXBorderWidth}px`;

  //setting up the two event listeners to handle the drag
  this.$body.addEventListener('mousemove', this.mousemoveListener);
  this.$body.addEventListener('mouseup',  this.mouseupListener);
    }
  }


  private drag (event) {
    this.stop(event);


    //Reload the container info in case the page scroll down
    this.extractContainerBounds();

    this.getLimitValues();

    this.lastYPosition = event.y || this.lastYPosition;

    //mouse.y in transform pixel values
    let mouseY = scrollY + this.lastYPosition - this.mouseInitialPosition;

    //Preventing the box drag outside the container TOP
    if (mouseY < this.limits.top && mouseY < this.limits.bottom) {
      mouseY = this.limits.top;
      this.$boxClone.style.top = `${mouseY}px`;

      //Preventing the box drag outside the container

    } else if (mouseY > this.limits.bottom && mouseY > this.limits.top) {
      mouseY = this.limits.bottom;
      this.$boxClone.style.top = `${mouseY}px`;

      //If the box is inside of the container TOP or BOTTOM, make it follow the mouse movement
    } else  {
      this.$boxClone.style.top = `${mouseY}px`;
    }

    //Abstracts the logic for sorting the items
    this.sort(event);

    this.doScrollWhileDragging(event);
  }

  private dragend (event) {
    this.stop(event);
    this.cursorStyle('default');

    this.doScrollWhileDragging();

    //removing the tracking of mousemove event
    this.$body.removeEventListener('mousemove', this.mousemoveListener);

    //normalizing the dragged box
    this.$body.removeChild(this.$boxClone);

    this.$box.removeAttribute('style');
    this.$box.style.transition = 'none';
    setTimeout(() => this.$box.removeAttribute('style'), 200);
    this.$box.classList.remove('is-dragging');

    //removing the mouseup eventListener itself
    this.$body.removeEventListener('mouseup',  this.mouseupListener);

    //remove the drag divisors
    this.queryAll(`[drag-type="divisor"]`).forEach($divisor => {
      $divisor.parentElement.removeChild($divisor);
    });

    [...this.queryAll('[drag-type="key"]')].filter($node => $node !== this.$key).forEach($key => $key.removeAttribute('style'));

    this.makeLockedItemsNotDraggable();

    const currentIdsArray = this.getSortedIds(true) || [];
    const otherDragData = this.getAditionalDragInfo();
    const callBackData = {
      ...otherDragData,
      name: this.dataDragName,
      order: currentIdsArray,
      moved: this.$box.getAttribute('drag-id')
    }

    if (currentIdsArray.some((id, i) => this.sortedIds[i] !== id) && this.sortedIds.length === currentIdsArray.length) this.callBackfn(callBackData);
    this.dragInitialized = false;
  }

  /*        __---------------------__        */
  /*-=====_| LOGIC TO SORT THE ITEMS |_=====-*/
  /*       --------------------------        */

  private sort (event) {
    this.stop(event);

    function getPointerDirection (number) {
      if (number === 0) return null;
      return number > 0
        ? 'down'
        : 'up';
    }

    this.pointerDirection =  getPointerDirection(event.y - this.lastMouseYPosition) || this.pointerDirection;
    this.lastMouseYPosition = event.y === this.lastMouseYPosition ? this.lastMouseYPosition : event.y;

    const randomElement = document.createElement('h1');
    const selectedDivisor = document.elementFromPoint(this.initialMouseXPosition, event.y) || randomElement;
    const selectedElement = selectedDivisor.closest(`[drag-type="item"]`);
    if (!selectedDivisor) return;

    const dragDivisor = selectedDivisor.getAttribute('drag-divisor');
    const elementSelected = selectedDivisor.closest('[drag-type="item"]');
    const divisorTopData = 'top';
    const divisorBottomData = 'bottom';

    const allItems = [...this.$container.querySelectorAll(`[drag-name=${this.dataDragName}]`)];

    function preloadAnimation (firstNode) {
      const firstPosition = firstNode.getBoundingClientRect();
      return function (secondNode) {
        const lastPosition = secondNode.getBoundingClientRect();

        const deltaY = firstPosition.top - lastPosition.top;

        secondNode.animate([{
          transformOrigin: 'top left',
          transform: `translate3d(0px, ${deltaY}px, 0)`
        }, {
          transformOrigin: 'top left',
          transform: 'none'
        }], {
          duration: 150,
          easing: 'ease',
        });
      }
    }

    function insertAfter(newNode, existingNode, invert?) {
      if (existingNode.nextElementSibling !== newNode) {
        const animatedNode = invert ? newNode : existingNode;
        const animate = preloadAnimation(animatedNode);
        existingNode.parentNode.insertBefore(newNode, existingNode.nextElementSibling)
        animate(animatedNode)
      }
    }

    function insertBefore(newNode, existingNode, invert?) {
      if (existingNode.previousElementSibling !== newNode) {
        const animatedNode = invert ? newNode : existingNode;
        const animate = preloadAnimation(animatedNode);
        existingNode.parentNode.insertBefore(newNode, existingNode);
        animate(animatedNode)
      }
    }

    const boxIndex = allItems.indexOf(this.$box);
    const selectedElementIndex = allItems.indexOf(selectedElement);
    const boxIsBeforeSelectedElement = boxIndex < selectedElementIndex;
    const boxIsAfterSelectedElement = boxIndex > selectedElementIndex;
    const getPreviousElement = ($element) => $element?.previousElementSibling || randomElement;
    const getNextElement = ($element) => $element?.nextElementSibling || randomElement;
    const elementBeforeIsntLocked = getPreviousElement(this.$box).getAttribute('drag-lock') !== 'true';
    const elementAfterIsntLocked = getNextElement(this.$box).getAttribute('drag-lock') !== 'true';

    if (dragDivisor === divisorTopData) {
      const doSwap = () => {
        const indexOffset = (boxIndex - selectedElementIndex - 1) || 0;

        const targetPosition = allItems[selectedElementIndex + indexOffset];
        const lastPosition = allItems[boxIndex - indexOffset];

        insertAfter(selectedElement, targetPosition, true);
        insertBefore(this.$box, lastPosition, true);
      }

      if (boxIndex - selectedElementIndex > 1) {
        doSwap();
      } else if (elementBeforeIsntLocked && boxIsAfterSelectedElement) {
        insertBefore(this.$box, elementSelected);
      }
    } else if (dragDivisor === divisorBottomData) {
      const doSwap = () => {
        const indexOffset =  selectedElementIndex - boxIndex - 1;

        const targetPosition = allItems[selectedElementIndex - indexOffset];
        const lastPosition = allItems[boxIndex + indexOffset];

        insertBefore(selectedElement, targetPosition, true);
        insertAfter(this.$box, lastPosition, true);
      }

      if (selectedElementIndex - boxIndex > 1) {
        doSwap();
      } else if (elementAfterIsntLocked && boxIsBeforeSelectedElement) {
        insertAfter(this.$box, elementSelected);
      }
    }

    //For a DOM manipulation porpouse this should be done with JS instead of normal CSS
    this.settingBorderRadiusOfTheLastNode();
  }
}