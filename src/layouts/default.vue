<script setup lang="ts">
import config from '/@src/app.config'

const props = withDefaults(
  defineProps<{
    navbar?: boolean
    footer?: boolean
    backToTop?: boolean
  }>(),
  {
    navbar: undefined,
    footer: undefined,
    backToTop: undefined,
  },
)

const route = useRoute()
</script>

<template>
  <div>
    <component
      :is="config.layout.navbar.component"
      v-if="
        config.layout?.navbar?.component &&
          (props.navbar ??
            route.meta?.navbar?.enabled ??
            config.layout?.navbar?.enabled)
      "
      v-bind="{
        ...((config.layout?.navbar?.props as any) ?? {}),
        ...(route.meta?.navbar?.props ?? {}),
      }"
    />

    <RouterView v-slot="{ Component }">
      <Transition
        :name="
          (route?.meta?.transition as string) ??
            config.layout?.transition ??
            'no-transition'
        "
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>

    <component
      :is="config.layout.footer.component"
      v-if="
        config.layout.footer?.component &&
          (props.footer ??
            route.meta?.footer?.enabled ??
            config?.layout?.footer?.enabled)
      "
      v-bind="{
        ...((config?.layout?.footer?.props as any) ?? {}),
        ...(route.meta?.footer?.props ?? {}),
      }"
    />

    <BackToTop v-if="props.backToTop ?? route.meta?.backToTop" />
  </div>
</template>
