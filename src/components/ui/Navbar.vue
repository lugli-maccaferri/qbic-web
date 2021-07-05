<template>
    <div id="navbar" class="flexbox">
        <div class="container flexbox align-center justify-between">
            <span> <b> qbic </b> </span>
            <span>
                <nav> 
                    <a href="/"> home </a>
                    <a href="/servers"> servers </a>
                    <a href="/settings"> settings </a>
                    <a href="/admin" v-if="$store.getters.user.is_admin"> admin stuff </a>
                </nav>
            </span>
        </div>
    </div>
</template>