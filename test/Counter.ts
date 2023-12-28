import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  async function deployCounterContract() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    return { counter, owner, otherAccount };
  }

  describe("Increase and decrease count", function () {
    it("Should be zero initially", async function () {
      const { counter, owner } = await loadFixture(deployCounterContract);
      expect(await counter._count()).to.equal(0);
    });
    it("Should be equal to one once increased", async function () {
      const { counter, owner } = await loadFixture(deployCounterContract);
      const increaseTx = await counter.increase();
      await increaseTx.wait();
      expect(await counter._count()).to.equal(1);
    });
    it("Should emit Increased event once increased", async function () {
      const { counter, owner } = await loadFixture(deployCounterContract);
      const increaseTx = await counter.increase();
      // Check event
      const filter = counter.filters.Increased(
        null // value
      );
      const updatedEvents = await counter.queryFilter(filter);
      expect(updatedEvents[0].args.updatedCount).equals(1);
    });
    it("Should be equal to zero once decreased", async function () {
      const { counter, owner } = await loadFixture(deployCounterContract);
      const increaseTx = await counter.increase();
      await increaseTx.wait();
      const decreaseTx = await counter.decrease();
      await decreaseTx.wait();
      expect(await counter._count()).to.equal(0);
    });
    it("Should emit Decreased once decreased", async function () {
      const { counter, owner } = await loadFixture(deployCounterContract);
      const increaseTx = await counter.increase();
      await increaseTx.wait();
      const decreaseTx = await counter.decrease();
      // Check event
      const filter = counter.filters.Decreased(
        null // value
      );
      const updatedEvents = await counter.queryFilter(filter);
      expect(updatedEvents[0].args.updatedCount).equals(0);
    });

    it("Should revert when count already zero", async function () {
      const { counter, owner } = await loadFixture(deployCounterContract);
      await expect(counter.decrease()).to.be.revertedWith("counter already zero");
    });


  });

});
