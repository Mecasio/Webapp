const itemImages = {
    jerrycan: {
      displayName: 'Jerrycan',
      img: 'https://vignette.wikia.nocookie.net/playerunknowns-battlegrounds/images/d/dc/Icon_jerrycan.png/revision/latest?cb=20170921010849'
    },
    hatchet: {
      displayName: 'Hatchet',
      img: 'https://vignette.wikia.nocookie.net/play-rust/images/0/06/Hatchet_icon.png/revision/latest?cb=20151106061743'
    },
    medkit: {
      displayName: 'Medkit',
      img: 'https://vignette.wikia.nocookie.net/playerunknowns-battlegrounds/images/8/8b/Icon_Heal_FirstAid.png/revision/latest?cb=20170921010656'
    },
    egg: {
      displayName: 'Egg',
      img: 'https://image.fnbr.co/backpack/5bf7483781389f481755a89a/icon.png'
    },
    apple: {
      displayName: 'Apple',
      img: 'https://vignette.wikia.nocookie.net/play-rust/images/d/dc/Apple_icon.png/revision/latest?cb=20151106061034'
    },
    metal: {
      displayName: 'Metal',
      img: 'https://image.fnbr.co/misc/5ab282cdca60ff804f8a3e78/icon.png'
    },
    stone: {
      displayName: 'Stone',
      img: 'https://image.fnbr.co/misc/5ab282d8ca60fff4d68a3e79/icon.png'
    },
    wood: {
      displayName: 'Wood',
      img: 'https://image.fnbr.co/misc/5ab282e3ca60ff26778a3e7a/icon.png'
    },
    grenade: {
      displayName: 'frag',
      img: 'https://vignette.wikia.nocookie.net/playerunknowns-battlegrounds/images/f/f9/Frag_icon.png/revision/latest?cb=20170903221516'
    },
  }
  
  const Inventory = {
    DOM: document.getElementById('inventory'),
    slots: [],
    addItem(slug, quantity) {
      if (!slug) return false
      for (slot of this.slots) {
        if (!slot.getItem()) {
          slot.setItem(slug, quantity)
          return true
        }
      }
      return false
    }
  }
  
  Inventory.columns = Inventory.DOM.dataset.columns
  Inventory.rows = Inventory.DOM.dataset.rows
  Inventory.maxSlots = Inventory.rows * Inventory.columns
  
  const SlotFragment = document.createDocumentFragment()
  
  function AppendSlots() {
    Inventory.DOM.appendChild(SlotFragment)
  }
  
  let itemCount = 0
  
  function Slot(id) {
    this.DOM = new DOMParser().parseFromString(`
      <div ondrop="drop(event)"
        ondragover="allowDrop(event)" 
        class="inventory__slot" 
        data-slot-id=${id}></div>`, 'text/html').body.firstChild
    this.id = id
    this.item = null
    this.setItem = (slug, quantity) => {
      this.item = new Item(slug, quantity)
      this.DOM.appendChild(this.item.DOM)
    }
    this.getItem = () => this.DOM.firstChild ? this.DOM.firstChild.dataset.itemSlug : null
    SlotFragment.appendChild(this.DOM)
  }
  
  function drag(e) {
    e.dataTransfer.setData("text", e.target.id)
  }
  
  function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text")
    if (e.target.className === 'inventory__slot') {
      e.target.appendChild(document.getElementById(data))
    } else if (e.target.className !== "slot__item") { 
      const targetSlot = e.target.parentNode.parentNode;
      const draggingSlot = document.getElementById(data).parentNode
      
      const targetSlotHtml = targetSlot.innerHTML
      const draggingSlotHtml = draggingSlot.innerHTML
          
      targetSlot.innerHTML = draggingSlotHtml;
      draggingSlot.innerHTML = targetSlotHtml;
    }
  
  }
  
  function allowDrop(e) {
    e.preventDefault()
  }
  
  function Item(slug, quantity) {
    itemCount++
    this.DOM = new DOMParser().parseFromString(`
    <div draggable=true id="${slug + itemCount}" 
        data-item-slug="${slug}" 
        class="slot__item"  
        ondragstart="drag(event)"
    >
      <img src="${itemImages[slug].img}" 
          draggable=false
          class="item__img"
          alt="${itemImages[slug].displayName}" 
          title="${itemImages[slug].displayName}" 
      />
      <p class="item__quantity">${quantity || 0}</p>
    </div>`, 'text/html').body.firstChild
    this.quantity = quantity
  }
  
  for (let i = 1; i <= Inventory.columns * Inventory.rows; i++ ) {
    Inventory.slots.push(new Slot(Inventory.slots.length))
  }
  
  Inventory.DOM.style.gridTemplate = `repeat(${Inventory.rows}, auto) / repeat(${Inventory.columns}, auto)`
  
  AppendSlots()
  
  // Test
  console.log(Inventory.addItem('medkit', 2))
  console.log(Inventory.addItem('egg', 20))
  console.log(Inventory.addItem('apple', 10))
  console.log(Inventory.addItem('metal', 50))
  console.log(Inventory.addItem('stone', 60))
  console.log(Inventory.addItem('wood', 30))
  console.log(Inventory.addItem('jerrycan', 2))
  console.log(Inventory.addItem('hatchet', 2))
  console.log(Inventory.addItem('grenade', 3))
 