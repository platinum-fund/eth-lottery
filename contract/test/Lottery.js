const BigNumber = web3.BigNumber
const EVMRevert = require('./helpers/EVMRevert')

const time = require('./helpers/time')
const { advanceBlock } = require('./helpers/advanceToBlock')
const { ether } = require('./helpers/ether')

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should()

const payEther = async function(target, options) {
  const preBalance = await web3.eth.getBalance(options.from)
  const { receipt } = await target.sendTransaction(options)
  const balance = await web3.eth.getBalance(options.from)
  const fee = new BigNumber(receipt.gasUsed).mul(
    new BigNumber(web3.eth.gasPrice)
  )
  return balance.add(options.value).sub(preBalance.sub(fee))
}

const Contract = artifacts.require('Lottery')

contract('Lottery', function([_, wallet1, wallet2, wallet3, wallet4, wallet5]) {
  beforeEach(async function() {
    await advanceBlock()
    this.contract = await Contract.new()
    this.startTime = await time.latest()
  })

  describe('tests', function() {
    it('should work at least once', async function() {
      ;(await this.contract.depositsCountForUser.call(
        wallet1
      )).should.be.bignumber.equal(0)
      ;(await this.contract.totalDeposits.call()).should.be.bignumber.equal(0)

      await this.contract.sendTransaction({ value: ether(1), from: wallet1 })
      ;(await this.contract.depositsCountForUser.call(
        wallet1
      )).should.be.bignumber.equal(1)
      ;(await this.contract.totalDeposits.call()).should.be.bignumber.equal(
        ether(1)
      )
    })

    it('should work at least twice from one address', async function() {
      await this.contract.sendTransaction({ value: ether(1), from: wallet1 })
      ;(await this.contract.depositsCountForUser.call(
        wallet1
      )).should.be.bignumber.equal(1)
      ;(await this.contract.totalDeposits.call()).should.be.bignumber.equal(
        ether(1)
      )

      await this.contract.sendTransaction({ value: ether(2), from: wallet1 })
      ;(await this.contract.depositsCountForUser.call(
        wallet1
      )).should.be.bignumber.equal(2)
      ;(await this.contract.totalDeposits.call()).should.be.bignumber.equal(
        ether(3)
      )
    })

    it('should work at least twice from different addresses', async function() {
      await this.contract.sendTransaction({ value: ether(1), from: wallet1 })
      ;(await this.contract.depositsCountForUser.call(
        wallet1
      )).should.be.bignumber.equal(1)
      ;(await this.contract.depositsCountForUser.call(
        wallet2
      )).should.be.bignumber.equal(0)
      ;(await this.contract.totalDeposits.call()).should.be.bignumber.equal(
        ether(1)
      )

      await this.contract.sendTransaction({ value: ether(2), from: wallet2 })
      ;(await this.contract.depositsCountForUser.call(
        wallet1
      )).should.be.bignumber.equal(1)
      ;(await this.contract.depositsCountForUser.call(
        wallet2
      )).should.be.bignumber.equal(1)
      ;(await this.contract.totalDeposits.call()).should.be.bignumber.equal(
        ether(3)
      )
    })

    it('should fail to create more than 50 deposits', async function() {
      for (let i = 0; i < 50; i++) {
        await this.contract.sendTransaction({
          value: ether(0.1),
          from: wallet1
        })
      }
      ;(await this.contract.depositsCountForUser(
        wallet1
      )).should.be.bignumber.equal(50)
      await this.contract
        .sendTransaction({ value: ether(0.1), from: wallet1 })
        .should.be.rejectedWith(EVMRevert)
    })

    it('should receive dividends for 50 deposits', async function() {
      for (let i = 0; i < 50; i++) {
        await this.contract.sendTransaction({
          value: ether(0.1),
          from: wallet1
        })
      }
      // console.log(
      await this.contract.sendTransaction({ value: 0, from: wallet1 })
      // );
    })

    it('should delete deposits after 50 days', async function() {
      for (let i = 0; i < 10; i++) {
        await this.contract.sendTransaction({
          value: ether(0.1),
          from: wallet1
        })
      }
      ;(await this.contract.depositsCountForUser(
        wallet1
      )).should.be.bignumber.equal(10)

      await time.increaseTo(
        this.startTime + time.duration.days(10) + time.duration.minutes(1)
      )

      for (let i = 0; i < 20; i++) {
        await this.contract.sendTransaction({
          value: ether(0.1),
          from: wallet1
        })
      }
      ;(await this.contract.depositsCountForUser(
        wallet1
      )).should.be.bignumber.equal(30)

      await time.increaseTo(
        this.startTime + time.duration.days(50) + time.duration.minutes(2)
      )

      await this.contract.sendTransaction({ value: ether(0), from: wallet1 })
      ;(await this.contract.depositsCountForUser(
        wallet1
      )).should.be.bignumber.equal(20)
    })
  })
})
