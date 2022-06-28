<script setup>
    import "./global.css";
    import Header from "./components/Header.vue";
    import List from "./components/List.vue";
</script>

<template>
    <Header> </Header>
    <main>
        <List></List>
    </main>
</template>

<style>
    main {
        max-width: 720px;
        margin: 0 auto;
        padding: 15px;
    }
</style>
