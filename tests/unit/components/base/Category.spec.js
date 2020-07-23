import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/base/Category.vue'

const localVue = createLocalVue()

describe('Category component', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  function factoryWithParent() {
    return mount(
      {
        data: () => {
          return {}
        },
        template: `
          <category data-app ref="component" @closing="log">
            <template v-slot:title>
              Mon titre
            </template>
            <template v-slot:text>
              <p>
                Mon texte.
              </p>
            </template>
            <template v-slot:form="{close}">
              <div><button ref="form-close" @click="close">Fermer</button></div>
            </template>
            <template v-slot:card="{open}">
              <div><button ref="form-open" @click="open">Ouvrir</button></div>
            </template>
          </category>
        `,
        components: { category: Component },
        methods: {
          log() {
            console.log('form closing...')
          }
        }
      },
      { localVue, vuetify }
    )
  }

  it('should display the user provided title', () => {
    const wrapper = factoryWithParent()

    expect(wrapper.find('h2').text()).toEqual('Mon titre')
    expect(wrapper.findAll('h2').length).toEqual(1)
  })

  it('should emit the opening event when clicking the button', async () => {
    const wrapper = factoryWithParent()

    await wrapper.findComponent({ name: 'v-btn' }).trigger('click')
    expect(
      wrapper.findComponent({ ref: 'component' }).emitted('opening').length
    ).toEqual(1)
    expect(wrapper.findComponent({ ref: 'form-close' }).exists()).toBe(true)
  })

  it('should emit the closing event when calling the close method from the form slot', async () => {
    const wrapper = factoryWithParent()

    expect(wrapper.findComponent({ ref: 'form-close' }).exists()).toBe(false)

    await wrapper.findComponent({ name: 'v-btn' }).trigger('click')
    expect(wrapper.findComponent({ ref: 'form-close' }).exists()).toBe(true)

    await wrapper.findComponent({ ref: 'form-close' }).trigger('click')
    expect(wrapper.findComponent({ ref: 'form-close' }).isVisible()).toBe(false)
    expect(
      wrapper.findComponent({ ref: 'component' }).emitted('closing').length
    ).toEqual(1)
  })

  it('should allow the parent to call the open method from the slot card', async () => {
    const wrapper = factoryWithParent()

    await wrapper.findComponent({ ref: 'form-open' }).trigger('click')
    expect(
      wrapper.findComponent({ ref: 'component' }).emitted('opening').length
    ).toEqual(1)
    expect(wrapper.findComponent({ ref: 'form-close' }).exists()).toBe(true)
  })
})
