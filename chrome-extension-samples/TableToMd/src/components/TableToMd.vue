<template>
  <div id="TableToMd">
    <div class="header no-select">
      <div class="header-div">
        <span>行</span>
        <plus-button @click.native="handleAdd('rows', 1)" />
        <MinusButton @click.native="handleAdd('rows', -1)" />
      </div>
      <div class="header-div">
        <span>列</span>
        <plus-button @click.native="handleAdd('columns', 1)" />
        <MinusButton @click.native="handleAdd('columns', -1)" />
      </div>
      <div class="header-div">
        <button @click="handleCopy" class="copy-button">Copy</button>
        <!-- <button @click="handleClear">Clear</button> -->
      </div>
    </div>
    <ol>
      <template v-for="(row, rowNum) of vals">
        <li :key="rowNum">
          <InputText
            v-for="(text, columnNum) of row"
            v-bind:value="text"
            :key="columnNum"
            @keyup.native="handleInput(vals, rowNum, columnNum, $event.target.value)"
          />
        </li>
        <template v-if="rowNum === 0">
          <li :key="`${rowNum}-alignment`">
            <select
              v-for="(val, index) of alignment"
              :key="index"
              v-bind:value="val"
              @change="handleSelectChange(index, $event.target.value)"
            >
              <option value=":--">左寄せ</option>
              <option value=":-:">中央寄せ</option>
              <option value="--:">右寄せ</option>
            </select>
          </li>
        </template>
      </template>
    </ol>
    <div>
      <textarea
        class="md-output"
        id="md-output-text"
        v-bind:value="md"
        v-bind:rows="head.rows + 2"
        cols="40"
      ></textarea>
    </div>
  </div>
</template>

<script>
import InputText from "./InputText";
import PlusButton from "./PlusButton";
import MinusButton from "./MinusButton";
/* eslint-disable no-console */

export default {
  name: "TableToMd",
  components: {
    InputText,
    PlusButton,
    MinusButton
  },
  mounted() {
    this.initVals();
    this.alignment = Array(this.head.columns).fill(":-:");
  },
  data() {
    return {
      head: {
        rows: 2, // 行
        columns: 3 // 列
      },
      vals: [
        // [["Head1", "Head2"],["Val1", "Val2"],["Val3", "Val4"]]の形式 // 2x3の列
      ],
      alignment: []
    };
  },
  methods: {
    /**
     * 縦横の幅(this.head)を増減させる
     * 最小は1x1
     */
    handleAdd: function(key, val) {
      if (this.head[key] === 1 && val < 0) return;
      this.$set(this.head, key, this.head[key] + val);

      if (key === "columns") {
        val === 1 ? this.alignment.push(":-:") : this.alignment.pop();
        this.vals.forEach(row => {
          val === 1 ? row.push("") : row.pop();
        });
      } else if (key === "rows") {
        this.vals = this.vals.filter(val => {
          return val[key.slice(0, -1)] !== this.head[key];
        });
        val === 1
          ? this.vals.push(Array(this.head.columns).fill(""))
          : this.vals.pop();
      }
    },
    /**
     * 縦横の幅(this.head)からデータを保存するオブジェクトを作る
     * @return [["Head1", "Head2"],["Val1", "Val2"]]の形式 // 2x2の列
     */
    initVals: function() {
      const vals = [];
      [...Array(this.head.rows)].forEach(() => {
        const row = [];
        [...Array(this.head.columns)].forEach(() => {
          row.push("");
        });
        vals.push(row);
      });
      this.vals = vals;
    },
    handleSelectChange: function(i, val) {
      const newArray = [...this.alignment];
      newArray.splice(i, 1);
      newArray.splice(i, 0, val);

      this.alignment = [...newArray];
    },
    /**
     * 入力を受けてテキストを書き換える
     * { row: 0, column: 0, text: "" }.text = input
     */
    handleInput: function(vals, rowNum, columnNum, val) {
      vals[rowNum][columnNum] = val;
      this.vals = [...vals];
    },
    handleCopy: function() {
      var copyText = document.querySelector("#md-output-text");
      copyText.select();
      document.execCommand("copy");
      console.log(this.rows);
      console.log(this.vals);
    }
  },
  computed: {
    /**
     * Markdownを返す 改行は\n
     * @return "| Head1 | Head2\n| :-: | :-:"\n| Val1 | Val2"
     */
    md: function() {
      const rows = [...this.vals];
      rows.splice(1, 0, this.alignment);
      const arr = rows.map(columns => {
        return `| ${columns.join(" | ")} |`;
      });
      return arr.join("\n");
    }
  }
};
</script>

<style scoped>
#TableToMd {
  min-width: 600px;
  min-height: 400px;
  background-color: #fcc;
  padding: 2%;
  border-radius: 10px;
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.header {
  display: flex;
  justify-content: center;
}

.md-output {
  display: inline-block;
  padding: 0.5em 1em;
  min-width: 200px;
  text-decoration: none;
  background-color: #fff;
  border: solid 1px #333;
  border-radius: 3px;
  line-height: 1em;
}

select {
  outline: none;
  text-indent: 0.01px;
  padding-left: 0.5em;
  vertical-align: middle;
  font-size: inherit;
  color: inherit;
  /* -webkit-appearance: button;
  -moz-appearance: button; */
  border: 1px;
  border-radius: 0;
  width: 92px;
  background-color: #fff;
}
select option {
  background-color: #fff;
  color: #333;
}

.copy-button {
  display: inline-block;
  height: 30px;
  padding: 3px 5px;
  text-decoration: none;
  color: #333;
  border: solid 1px #333;
  border-radius: 4px;
}
</style>>
