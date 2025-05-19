const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        About
      </h1>

      {/* Main content */}
      <article className="space-y-6 text-base leading-relaxed text-base-content">
        <p>
          사람들과 음악 이야기를 나누다 보면, 종종 “어떤 음악을 좋아해?”라는
          질문을 듣게 된다. 가장 좋아하는 뮤지션이나 가장 좋아하는 노래는 비교적
          쉽게 대답할 수 있지만, &#39;어떤 음악&#39;이라는 질문은 생각보다
          모호하게 느껴진다.
        </p>
        <p>
          장르를 얘기하면 되지 않느냐고 생각할 수 있지만, 그렇지도 않다. 예를
          들어 Nirvana와 Radiohead는 모두 얼터너티브 록으로 분류되지만 음악적
          성향은 상당히 다르다. 반대로 누군가가 &#39;얼터너티브 록&#39;을
          좋아한다고 했을 때, 그것이 Nirvana 스타일인지, Radiohead 스타일인지,
          아니면 Muse 스타일인지는 쉽게 알 수 없다.
        </p>
        <p>
          사실 나 자신도 내가 정확히 어떤 음악을 좋아하는지 완전히 알고 있다고
          말하긴 어렵다. 무의식적으로 따르고 있는 여러 기준들이 있겠지만, 그것을
          말로 설명하고 수치화하는 일은 결코 쉬운 일이 아니다.
        </p>
        <p>
          그럼에도 불구하고, 내 음악 취향을 더 깊이 이해하고 싶었고, 이를 다른
          사람들에게도 명확하고 근거 있게 설명하고 싶었다. 그래서 이 사이트를
          만들게 되었다.
        </p>
        <p>
          이 사이트는 내가 심사숙고 끝에 정한 일곱 가지 기준을 바탕으로 곡을
          평가하고, 각 기준에 평점을 매겨 평균을 낸 뒤 점수에 따라 노래들을
          정렬하여 보여주는 형태로 구성되어 있다. 현재의 평가 기준은 다음과
          같다:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>구조적 흐름</b> (structure): 곡의
            구성(도입→전개→클라이맥스→마무리)의 자연스러움
          </li>
          <li>
            <b>가사</b> (lyrics): 문학성, 공감도, 메시지 전달력
          </li>
          <li>
            <b>프로덕션</b> (production): 음향 품질, 밸런스, 믹싱
          </li>
          <li>
            <b>퍼포먼스</b> (performance): 연주의 완성도와 생동감
          </li>
          <li>
            <b>독창성</b> (originality): 참신하고 차별화된 요소
          </li>
          <li>
            <b>멜로디 &amp; 리듬</b> (melody &amp; rhythm): 중독성 있는 흐름
          </li>
          <li>
            <b>감정 깊이</b> (emotion): 감정의 전달력과 다양성
          </li>
        </ul>
        <p>
          이 기준들을 통해 막연했던 감상이 구체적인 언어로 정리되었고,
          수치화되면서 새로운 시각을 얻게 되었다. 주관적인 감정을 수치로
          표현한다는 것이 모순처럼 느껴질 수도 있지만, 오히려 그 과정 자체가
          매우 흥미롭고 유익했다.
        </p>
        <p>
          앞으로는 내가 중요하게 생각하는 항목에 가중치를 주는 기능도 추가할
          예정이다. 예를 들어 가사를 중시한다면 가사 점수에 0.3을 곱해 평균에 더
          큰 영향을 미치도록 조정할 수 있다.
        </p>
        <p>
          이 사이트는 결국, 내가 스스로에게 &#34;나는 어떤 음악을 좋아하는
          사람인가?&#34;라는 질문에 조금 더 정직하게 답하기 위한 도구다.
        </p>

        {/* Subtle English translation */}
        <div className="text-sm text-base-content/60 border-t pt-6 mt-6 space-y-4 italic">
          <p>
            When talking with others about music, I&#39;m often asked, &#34;What
            kind of music do you like?&#34; While I can easily name my favorite
            artist or song, answering what kind of music I like always feels
            surprisingly vague.
          </p>
          <p>
            You might think it&#39;s just a matter of naming a genre—but
            it&#39;s not that simple. For example, Nirvana and Radiohead are
            both categorized as alternative rock, yet their musical styles are
            vastly different. So when someone says they like &#34;alternative
            rock,&#34; it doesn&#39;t tell you whether they mean Nirvana,
            Radiohead, or even Muse.
          </p>
          <p>
            Honestly, I&#39;m not sure I even fully understand my own taste in
            music. I probably have a set of subconscious criteria, but
            expressing those in words—or numbers—is no easy task.
          </p>
          <p>
            Still, I wanted to better understand my musical preferences and be
            able to explain them clearly and logically to others. That&#39;s why
            I created this site.
          </p>
          <p>
            This site evaluates songs based on seven carefully chosen criteria,
            assigning a score to each and then averaging them to rank tracks.
            The current evaluation criteria are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <b>Structure</b>: Natural flow from intro to climax to end
            </li>
            <li>
              <b>Lyrics</b>: Literary quality, emotional resonance, message
              clarity
            </li>
            <li>
              <b>Production</b>: Sound quality, balance, mixing
            </li>
            <li>
              <b>Performance</b>: Skill and vitality in vocals and instruments
            </li>
            <li>
              <b>Originality</b>: Unique and fresh elements
            </li>
            <li>
              <b>Melody &amp; Rhythm</b>: Catchiness and rhythm
            </li>
            <li>
              <b>Emotion</b>: Intensity and variety of emotion conveyed
            </li>
          </ul>
          <p>
            These criteria helped me turn vague feelings into structured
            thoughts and measurable scores, offering fresh insights into the
            music I enjoy. Quantifying something so subjective may seem
            paradoxical, but the process itself has been engaging and rewarding.
          </p>
          <p>
            I also plan to add a weighting system for criteria I value more—for
            example, emphasizing lyrics by applying a multiplier like 0.3 to
            their score.
          </p>
          <p>
            Ultimately, this site is a personal tool to answer the question:
            &#34;What kind of music do I truly love?&#34;
          </p>
        </div>
      </article>
    </div>
  );
};

export default AboutPage;
