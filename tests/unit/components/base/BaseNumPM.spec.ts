import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/ui/components/base/BaseNumPM.vue'

const localVue = createLocalVue()

describe('Plus and minus button', () => {
  let vuetify: Vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  function factoryWithParent(value = 5) {
    return mount(
      {
        data: () => {
          return { myValue: value }
        },
        template:
          '<num-pm ref="component" v-model="myValue" :min="0" :max="10" :step="1" :prefix="\'Préfixe\'"/>',
        components: { 'num-pm': Component }
      },
      { localVue, vuetify }
    )
  }

  it('should have a prefix', () => {
    const wrapper = factoryWithParent()
    expect(wrapper.find('.v-text-field__prefix').text()).toEqual('Préfixe')
  })

  it('should display the initial value', () => {
    const wrapper = factoryWithParent(5)
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('5')
  })

  it('should increment by step when clicking on the plus btn', async () => {
    const wrapper = factoryWithParent()
    await wrapper
      .findComponent({ ref: 'component' })
      .findComponent({ ref: 'plus' })
      .trigger('click')
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('6')
    expect(wrapper.vm.$data.myValue).toBe(6)
  })

  it('should decrement by step when clicking on the minus btn', async () => {
    const wrapper = factoryWithParent()
    await wrapper
      .findComponent({ ref: 'component' })
      .findComponent({ ref: 'minus' })
      .trigger('click')
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('4')
    expect(wrapper.vm.$data.myValue).toBe(4)
  })

  it('should not allow value greater than max when using the plus btn', async () => {
    const wrapper = factoryWithParent(10)
    await wrapper
      .findComponent({ ref: 'component' })
      .findComponent({ ref: 'plus' })
      .trigger('click')
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('10')
    expect(wrapper.vm.$data.myValue).toBe(10)
  })

  it('should not allow value less than min when using the minus btn', async () => {
    const wrapper = factoryWithParent(0)
    await wrapper
      .findComponent({ ref: 'component' })
      .findComponent({ ref: 'minus' })
      .trigger('click')
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('0')
    expect(wrapper.vm.$data.myValue).toBe(0)
  })

  it(`should display an error message if the value entered by the user is greater than the max`, async () => {
    const wrapper = factoryWithParent()
    await wrapper.find('input').setValue('12')
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('12')
    expect(wrapper.vm.$data.myValue).toBe(5)
    expect(wrapper.find('.v-messages__wrapper').element.textContent).toBe(
      'La valeur doit être ≤ 10'
    )
  })

  it(`should display an error message if the value entered by the user is lesser than the min`, async () => {
    const wrapper = factoryWithParent()
    await wrapper.find('input').setValue('-1')
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('-1')
    expect(wrapper.vm.$data.myValue).toBe(5)
    expect(wrapper.find('.v-messages__wrapper').element.textContent).toBe(
      'La valeur doit être ≥ 0'
    )
  })

  it(`should display an error message if the value entered by the user is not a number`, async () => {
    const wrapper = factoryWithParent()
    await wrapper.find('input').setValue('toto')
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('toto')
    expect(wrapper.vm.$data.myValue).toBe(5)
    expect(wrapper.find('.v-messages__wrapper').element.textContent).toBe(
      'La valeur doit être un nombre'
    )
  })

  it(`should display an error message if no value is entered by the user`, async () => {
    const wrapper = factoryWithParent()
    await wrapper.find('input').setValue('')
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('')
    expect(wrapper.vm.$data.myValue).toBe(5)
    expect(wrapper.find('.v-messages__wrapper').element.textContent).toBe(
      'Valeur requise'
    )
  })
})
