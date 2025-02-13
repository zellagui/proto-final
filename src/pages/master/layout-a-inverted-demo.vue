<route lang="yaml">
meta:
  navbar:
    enabled: false
</route>

<template>
  <div>
    <NavbarA
      fixed
      :inverted="true"
    />
    <DemoLayoutComponent inverted />
  </div>
</template>
