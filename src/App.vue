<template>
  <div>
    <h1>I guess this isn't working?</h1>
    <Tabs>
      <TabPanel>
        <template v-slot:header>💰Tab 1</template>
        <p>This is tab 1</p>
      </TabPanel>
      <TabPanel>
        <template v-slot:header>🔥Tab 2</template>
        <p>This is tab 2</p>
      </TabPanel>
      <TabPanel>
        <template v-slot:header>👏Tab 3</template>
        <p>This is tab 3</p>
      </TabPanel>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, TabPanel } from './components/Tabs.js';

export default {
  name: 'App',
  components: {
    Tabs,
    TabPanel
  }
};
</script>

<style></style>
