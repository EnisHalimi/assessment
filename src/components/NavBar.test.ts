import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from './NavBar.vue'

describe('NavBar component', () => {
  it('It should display the title for the site if it was sent as a prop', () => {
    const wrapper = mount(NavBar, {
      props: { siteName: 'test' }
    })
    const title = wrapper.get('#navbar-title')

    expect(title.text()).toContain('test')
  }),
    it('It should display the title Application if no prop was sent to it', () => {
      const wrapper = mount(NavBar)
      const title = wrapper.get('#navbar-title')

      expect(title.text()).toContain('Application')
    })
})
