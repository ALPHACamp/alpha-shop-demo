const form = document.getElementById('a-form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.getElementById('step-control')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.btn-pink')
const prevBtn = btnControl.querySelector('.btn-outline')
const cartOrder = document.getElementById('cart-order')
const amountTotal = document.getElementById('amount-total')
const shippingFee = document.getElementById('shipping-fee')
const chargetype = document.getElementById('charge-type')
const commonFee = shippingFee.firstElementChild.lastElementChild
const dhlFee = shippingFee.lastElementChild.lastElementChild

let step = 0 // 計算步驟0 1 2
let total = 5298
let type = ''

// amountTotal.innerHTML = '$ ' + `${total.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}`
amountTotal.innerHTML = '$ ' + new Intl.NumberFormat().format(total)

function purchaseTotal (e) {
  e.preventDefault()
  const price = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent
  if (e.target.matches('.goods-loss')) {
    const count = e.target.nextElementSibling.innerText
    if (count > 1) {
      e.target.nextElementSibling.innerText--
      total = total - Number(price)
    }
    amountTotal.innerHTML = '$ ' + new Intl.NumberFormat().format(total)

  } else if (e.target.matches('.goods-add')) {
    const count = e.target.previousElementSibling.innerText++
    total = total + Number(price)
    amountTotal.innerHTML = '$ ' + new Intl.NumberFormat().format(total)

  }
}

function handleBtnControlClicked (e) {
  e.preventDefault() // 停止事件的默認動作
  const nowStep = steps[step]
  if (e.target.matches('.btn-pink')) {
    if (step === 2) {
      return
    }
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}

function setBtnDisabled () {
  if (step === 0) {
    prevBtn.setAttribute('disabled', 'disabled')
  } else {
    prevBtn.removeAttribute('disabled')
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步 →'
  }
}

function shippingTotal (e) {
  if (e.target.matches('.mark')) {
    total -= 500
    type = '免運'
    commonFee.classList.remove('mark')
    dhlFee.classList.add('mark2')
  } else {
    if (e.target.matches('.mark2')) {
      total += 500
      type = '$500'
      dhlFee.classList.remove('mark2')
      commonFee.classList.add('mark')
    } else {
      total += 0
    }
  }
  chargetype.innerText = type
  amountTotal.innerHTML = '$ ' + new Intl.NumberFormat().format(total)
}

btnControl.addEventListener('click', handleBtnControlClicked)
shippingFee.addEventListener('click', shippingTotal)
cartOrder.addEventListener('click', purchaseTotal)
