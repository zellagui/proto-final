<route lang="yaml">
meta:
  navbar:
    enabled: false
</route>

<template>
  <div>
    <NavbarF
      fixed
      :inverted="true"
    />
    <DemoLayoutComponent inverted />
  </div>
</template>
