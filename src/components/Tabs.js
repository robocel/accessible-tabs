import './Tabs.css';

export const Tabs = {
  name: 'Tabs',
  data: function() {
    return {
      selectedIdx: 0,
      maxTabs: this.$slots.default.length
    };
  },
  beforeDestroy: function() {
    window.removeEventListener('keydown', this.handleKeypress);
  },
  methods: {
    selectTab: function(idx) {
      this.selectedIdx = idx;
      this.$refs[`vat-tab-${this.selectedIdx}`].focus();
    },
    onFocus: function() {
      window.addEventListener('keydown', this.handleKeypress);
    },
    onBlur: function() {
      window.removeEventListener('keydown', this.handleKeypress);
    },
    handleKeypress: function(event) {
      switch (event.code) {
        case 'ArrowLeft':
          this.selectTab(
            this.selectedIdx === 0 ? this.maxTabs - 1 : this.selectedIdx - 1
          );
          break;
        case 'ArrowRight':
          this.selectTab(
            this.selectedIdx === this.maxTabs - 1 ? 0 : this.selectedIdx + 1
          );
          break;
        case 'Home':
          this.selectTab(0);
          break;
        case 'End':
          this.selectTab(this.maxTabs - 1);
          break;
      }
    }
  },
  render(createElement) {
    return createElement('div', { class: { 'vat-tabcontainer': true } }, [
      createElement(
        'div',
        { class: { 'vat-tablist': true } },
        this.$slots.default.map((node, idx) => {
          return createElement(
            'button',
            {
              attrs: {
                role: 'tab',
                'aria-selected': idx === this.selectedIdx,
                'aria-controls': `vat-tabpanel-${idx}`,
                ...(idx !== this.selectedIdx && { tabindex: -1 }),
                id: `vat-tab-${idx}`
              },
              class: {
                'vat-tab': true,
                'vat-tab--selected': idx === this.selectedIdx
              },
              on: {
                click: () => this.selectTab(idx),
                focus: this.onFocus,
                blur: this.onBlur
              },
              ref: `vat-tab-${idx}`
            },
            node.data.scopedSlots.header()
          );
        })
      ),
      this.$slots.default.map((node, index) =>
        createElement(
          TabPanel,
          { props: { index, selected: index === this.selectedIdx } },
          node.componentOptions.children
        )
      )
    ]);
  }
};

export const TabPanel = {
  name: 'TabPanel',
  props: {
    index: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          id: `vat-tabpanel-${this.index}`,
          role: 'tabpanel',
          tabindex: '0',
          'aria-labelledby': `vat-tab-${this.index}`,
          ...(!this.selected && { hidden: 'hidden' })
        },
        class: {
          'vat-tabpanel': true,
          'vat-tabpanel--selected': this.selected
        },
        style: {
          ...(!this.selected && { display: 'none' })
        }
      },
      this.$slots.default
    );
  }
};

/*

<div class="vat-tabcontainer">
  <div class="vat-tablist">
    <button id="vat-tab-1" role="tab" aria-selected="true" aria-controls="vat-tabpanel-1" class="vat-tab vat-tab--selected">💰Tab 1</button>
    <button id="vat-tab-2" role="tab" aria-selected="false" tabindex="-1" aria-controls="vat-tabpanel-2" class="vat-tab">🔥Tab 2</button>
  </div>
  <div id="vat-tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="vat-tab-1" class="vat-tabpanel vat-tabpanel--selected">
    <p>This is tab 1</p>
  </div>
  <div id="vat-tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="vat-tab-2" hidden="hidden" class="vat-tabpanel">
    <p>This is tab 2</p>
  </div>
</div>

<Tabs>
  <Tab>
    <template v-slot:header>💰Tab 1</template>
    <p>This is tab 1</p>
  </Tab>
  <Tab>
    <template v-slot:header>🔥Tab 2</template>
    <p>This is tab 2</p>
  </Tab>
</Tabs>

Key	Function

Tab
  When focus moves into the tab list, places focus on the active tab element .
  When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the tabpanel element.

Enter, Space
  When a tab has focus, activates the tab, causing its associated panel to be displayed.

Right Arrow
  When a tab has focus:
    Moves focus to the next tab.
    If focus is on the last tab, moves focus to the first tab.

Left Arrow
  When a tab has focus:
    Moves focus to the previous tab.
    If focus is on the first tab, moves focus to the last tab.

Home
  When a tab has focus, moves focus to the first tab.

End
  When a tab has focus, moves focus to the last tab.

Delete
  When focus is on the Joke tab, removes the tab from the tab list and places focus on the previous tab.

*/
