import { mount } from '@vue/test-utils'
import BaseModal from './BaseModal.vue'

describe('BaseModal', () => {
  it('renders content when show=true', () => {
    const wrapper = mount(BaseModal, {
      props: { show: true },
      slots: {
        default: '<div>Hello modal</div>',
      },
    })

    expect(wrapper.text()).toContain('Hello modal')
  })

  it('emits "close" when clicking on background', async () => {
    const wrapper = mount(BaseModal, {
      props: { show: true },
      slots: {
        default: '<div>Content</div>',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted().close).toBeTruthy()
  })
})
