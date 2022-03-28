<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col md="8" style="margin-top: 5vh">
          <b-card> </b-card>
        </b-col>
        <b-col md="4" style="margin-top: 5vh">
          <b-card no-body header="关于" header-tag="header">
            <b-list-group>
              <b-list-group-item class="m-text">
                本站使用的是Gin+Vue+BootstrapVue搭建的
                <br style="margin-bottom: 1em" />
                本站所有源码已上传github,如有问题可进行留言
              </b-list-group-item>
              <b-list-group-item>
                <b-button size="sm" variant="outline-info" pill>编程</b-button>
                <b-button size="sm" variant="outline-info" pill>游戏</b-button>
              </b-list-group-item>
              <b-list-group-item>
                  <b-icon icon="github"></b-icon>
                <svg
                  width="1rem"
                  height="1rem"
                  xmlns="http://www.w3.org/2000/svg"
                  name="zi_tmQq"
                  viewBox="0 0 2000 2000"
                >
                  <path
                    d="M1638 1675q-25 4-95-88-35-49-63-95 0 88-46 180-46 102-134 175 71 25 113 50 70 38 51 70t-248 32q-193 0-316-15-123 15-316 15-229 0-248-32t51-70q42-25 112-50-87-73-133-175-46-92-46-180l-63 95q-70 92-95 88-10 0-17-35-4-42 3-113 14-87 49-200 28-98 109-295l32-78q-11-330 126-530 148-225 434.5-225T1336 420q137 200 126 534l32 78q81 200 109 295 35 113 49 200 7 71 3 113-7 35-17 35z"
                  />
                </svg>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.m-text {
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.8;
}
.m-btn-dorder {
  border: none;
}
</style>