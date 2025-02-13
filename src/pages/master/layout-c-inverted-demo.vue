<route lang="yaml">
meta:
  navbar:
    enabled: false
</route>

<template>
  <div>
    <NavbarC
      fixed
      :inverted="true"
    />
    <DemoLayoutComponent inverted />
  </div>
</template>
